from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import io
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
AGENCY_EMAIL = os.environ.get('AGENCY_EMAIL', 'delivered@resend.dev')

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormRequest(BaseModel):
    nome_artistico: Optional[str] = None
    plataformas: str
    faturamento: str
    como_conheceu: str
    mensagem: Optional[str] = None

class ContactFormResponse(BaseModel):
    id: str
    status: str
    message: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "TKT2Rocket API - Running"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactFormResponse)
async def submit_contact_form(form_data: ContactFormRequest):
    form_id = str(uuid.uuid4())
    
    # Save to database
    doc = {
        "id": form_id,
        "nome_artistico": form_data.nome_artistico or "Não informado",
        "plataformas": form_data.plataformas,
        "faturamento": form_data.faturamento,
        "como_conheceu": form_data.como_conheceu,
        "mensagem": form_data.mensagem or "",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "status": "new"
    }
    await db.contact_submissions.insert_one(doc)
    
    # Build HTML email
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #333; padding: 30px;">
            <h1 style="color: #C41E3A; margin-bottom: 30px;">Nova Candidatura - TKT2Rocket</h1>
            
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #333;">
                    <td style="padding: 15px 0; color: #C9A84C; font-weight: bold;">Nome Artístico:</td>
                    <td style="padding: 15px 0;">{form_data.nome_artistico or 'Não informado'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #333;">
                    <td style="padding: 15px 0; color: #C9A84C; font-weight: bold;">Plataformas:</td>
                    <td style="padding: 15px 0;">{form_data.plataformas}</td>
                </tr>
                <tr style="border-bottom: 1px solid #333;">
                    <td style="padding: 15px 0; color: #C9A84C; font-weight: bold;">Faturamento Médio:</td>
                    <td style="padding: 15px 0;">{form_data.faturamento}</td>
                </tr>
                <tr style="border-bottom: 1px solid #333;">
                    <td style="padding: 15px 0; color: #C9A84C; font-weight: bold;">Como nos conheceu:</td>
                    <td style="padding: 15px 0;">{form_data.como_conheceu}</td>
                </tr>
                <tr>
                    <td style="padding: 15px 0; color: #C9A84C; font-weight: bold; vertical-align: top;">Mensagem:</td>
                    <td style="padding: 15px 0;">{form_data.mensagem or 'Sem mensagem adicional'}</td>
                </tr>
            </table>
            
            <p style="margin-top: 30px; color: #666; font-size: 12px;">
                ID da Candidatura: {form_id}<br>
                Data: {datetime.now(timezone.utc).strftime('%d/%m/%Y às %H:%M')} UTC
            </p>
        </div>
    </body>
    </html>
    """
    
    # Send email via Resend
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [AGENCY_EMAIL],
            "subject": f"Nova Candidatura TKT2Rocket - {form_data.nome_artistico or 'Anônima'}",
            "html": html_content
        }
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email sent for contact form {form_id}")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        # Continue even if email fails - data is saved in DB

    return ContactFormResponse(
        id=form_id,
        status="success",
        message="Candidatura enviada com sucesso! Entraremos em contato em breve."
    )

@api_router.get("/submissions", response_model=List[dict])
async def get_submissions():
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    return submissions

# PDF Generation endpoint
@api_router.get("/download-pdf")
async def download_pdf():
    buffer = io.BytesIO()
    
    # Colors
    BLACK = HexColor('#0a0a0a')
    WINE = HexColor('#C41E3A')
    GOLD = HexColor('#C9A84C')
    WHITE = HexColor('#FFFFFF')
    GRAY = HexColor('#666666')
    
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    # Styles
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=28,
        textColor=WINE,
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=GOLD,
        spaceAfter=15,
        alignment=TA_CENTER,
        fontName='Helvetica'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=WINE,
        spaceBefore=25,
        spaceAfter=12,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=11,
        textColor=HexColor('#333333'),
        spaceAfter=10,
        leading=16,
        fontName='Helvetica'
    )
    
    highlight_style = ParagraphStyle(
        'Highlight',
        parent=styles['Normal'],
        fontSize=12,
        textColor=WINE,
        spaceAfter=10,
        fontName='Helvetica-Bold'
    )
    
    # Build content
    story = []
    
    # Header
    story.append(Paragraph("TKT2Rocket", title_style))
    story.append(Paragraph("Você cria. A gente cuida de tudo.", subtitle_style))
    story.append(Spacer(1, 30))
    
    # Intro
    story.append(Paragraph("Gestão de carreira para criadores de conteúdo adulto 18+", body_style))
    story.append(Spacer(1, 20))
    
    # O Problema
    story.append(Paragraph("Você virou empresário sem querer", heading_style))
    story.append(Paragraph("• Passa mais tempo respondendo DM do que criando conteúdo", body_style))
    story.append(Paragraph("• Tem ideia, mas não tem calendário. Tem audiência, mas não tem estratégia", body_style))
    story.append(Paragraph("• Lida com problema de plataforma, relatório financeiro e ainda precisa postar hoje", body_style))
    story.append(Paragraph("A gente resolve os três. Ao mesmo tempo.", highlight_style))
    
    # Os 3 Pilares
    story.append(Paragraph("Uma parceria real. Não um serviço.", heading_style))
    story.append(Paragraph("Somos sócios do seu crescimento, só crescemos se você crescer.", body_style))
    story.append(Spacer(1, 10))
    
    story.append(Paragraph("PILAR 01 — Gestão de Trocas de Divulgação", highlight_style))
    story.append(Paragraph("Você entra numa rede de mais de 25 perfis parceiros — alguns com mais de 15 mil assinantes. Sua divulgação começa no dia 1, dentro dos maiores canais do nicho. Sem esperar. Sem construir do zero.", body_style))
    
    story.append(Paragraph("PILAR 02 — Mentoria Completa", highlight_style))
    story.append(Paragraph("Do zero ao avançado. Como abrir plataformas, vender conteúdo exclusivo, aumentar retenção de assinantes, fazer colabs e melhorar o que você já produz. A gente pega na mão — todos os dias, o dia todo.", body_style))
    
    story.append(Paragraph("PILAR 03 — Gestão de Redes Sociais", highlight_style))
    story.append(Paragraph("Criamos e gerenciamos múltiplas contas em todas as plataformas: Instagram, TikTok, Threads, X. Escrevemos, postamos e esquentamos o algoritmo. Quando o viral vier — e ele vem — você já está pronta.", body_style))
    
    # Skin in the Game
    story.append(Paragraph("Skin in the Game", heading_style))
    story.append(Paragraph("É simples começar a trabalhar com a gente.", body_style))
    story.append(Paragraph("Nossa remuneração é baseada principalmente no crescimento que geramos para você.", body_style))
    story.append(Paragraph("Se você não cresce, a parceria não ganha.", body_style))
    story.append(Paragraph("Isso não é promessa, é modelo de negócio!", highlight_style))
    
    # Sobre
    story.append(Paragraph("A gente entende porque viveu", heading_style))
    story.append(Paragraph("A TKT2Rocket nasceu de dentro do nicho. Somos produtores de conteúdo que construíram, na prática, uma das maiores operações do segmento adulto 18+ do Brasil.", body_style))
    story.append(Paragraph("Nossa fundadora chegou ao Top 1 do Privacy, menos de 2% do OnlyFans e é presença constante nos tops do HotVips e CloseFans.", body_style))
    story.append(Paragraph("Não ensinamos teoria. Ensinamos exatamente o que fizemos.", highlight_style))
    
    # Resultados
    story.append(Paragraph("Números que falam", heading_style))
    story.append(Paragraph("• Top 1 — Ranking alcançado no Privacy pela fundadora da agência", body_style))
    story.append(Paragraph("• Top 2% — Posição no OnlyFans global — entre as maiores do Brasil", body_style))
    story.append(Paragraph("• +25 — Criadoras ativas gerenciadas exclusivamente no nicho", body_style))
    
    # Privacidade
    story.append(Paragraph("Sua identidade é sagrada aqui", heading_style))
    story.append(Paragraph("Entendemos que privacidade não é opcional, é fundamental. Operamos com total discrição, contratos claros e processos que protegem sua identidade em cada etapa da parceria.", body_style))
    story.append(Paragraph("• Contrato de confidencialidade", body_style))
    story.append(Paragraph("• Zero exposição não autorizada", body_style))
    story.append(Paragraph("• Processos auditáveis e transparentes", body_style))
    
    # CTA
    story.append(Spacer(1, 30))
    story.append(Paragraph("Pronto para parar de fazer tudo sozinho?", heading_style))
    story.append(Paragraph("As vagas para novas parcerias são limitadas.", body_style))
    story.append(Spacer(1, 20))
    
    # Contato
    story.append(Paragraph("Entre em contato:", highlight_style))
    story.append(Paragraph("Instagram: @tkt2rocket.agencia", body_style))
    story.append(Paragraph("Telegram: @Tkt2Rocket", body_style))
    story.append(Paragraph("Site: tkt2-launch.preview.emergentagent.com", body_style))
    
    # Footer
    story.append(Spacer(1, 40))
    story.append(Paragraph("© 2025 TKT2Rocket — Todos os direitos reservados", ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=9,
        textColor=GRAY,
        alignment=TA_CENTER
    )))
    story.append(Paragraph("+18 · Conteúdo destinado a maiores de idade", ParagraphStyle(
        'FooterSmall',
        parent=styles['Normal'],
        fontSize=8,
        textColor=GRAY,
        alignment=TA_CENTER
    )))
    
    doc.build(story)
    buffer.seek(0)
    
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=TKT2Rocket-Apresentacao.pdf"}
    )

# Include the router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

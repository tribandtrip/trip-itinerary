#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# TRIB & TRIP — Deploy script
# Sustituye el contenido del repositorio trip-itinerary en GitHub Pages
#
# USO:
#   chmod +x deploy.sh
#   ./deploy.sh
#
# REQUISITOS:
#   - Git instalado y configurado con tu usuario de GitHub
#   - Acceso al repo tribandtrip/trip-itinerary (push)
# ─────────────────────────────────────────────────────────────────────────────

set -e  # Si cualquier comando falla, para el script

# ── Config ────────────────────────────────────────────────────────────────────
REPO_URL="https://github.com/tribandtrip/trip-itinerary.git"
BRANCH="main"          # Cambia a 'gh-pages' si tu GitHub Pages usa esa rama
TMP_DIR="/tmp/trip-deploy-$$"

# ── Colores para la consola ───────────────────────────────────────────────────
RED='\033[0;31m'
GRN='\033[0;32m'
YEL='\033[1;33m'
BLU='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLU}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLU}  TRIB & TRIP — Deploy a GitHub Pages${NC}"
echo -e "${BLU}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# ── 1. Clonar el repo existente en un directorio temporal ─────────────────────
echo -e "${YEL}[1/5]${NC} Clonando repositorio..."
git clone "$REPO_URL" "$TMP_DIR"
echo -e "      ${GRN}✓${NC} Repositorio clonado"

# ── 2. Limpiar archivos existentes (excepto .git) ─────────────────────────────
echo -e "${YEL}[2/5]${NC} Limpiando archivos anteriores..."
find "$TMP_DIR" -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
echo -e "      ${GRN}✓${NC} Archivos anteriores eliminados"

# ── 3. Copiar los nuevos archivos ─────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo -e "${YEL}[3/5]${NC} Copiando nuevos archivos desde: $SCRIPT_DIR"
cp "$SCRIPT_DIR/index.html"    "$TMP_DIR/"
cp "$SCRIPT_DIR/itinerary.jsx" "$TMP_DIR/"
echo -e "      ${GRN}✓${NC} Archivos copiados:"
echo -e "           index.html"
echo -e "           itinerary.jsx"

# ── 4. Commit ─────────────────────────────────────────────────────────────────
echo -e "${YEL}[4/5]${NC} Commiteando cambios..."
cd "$TMP_DIR"
git add -A
TIMESTAMP=$(date +"%Y-%m-%d %H:%M")
git commit -m "feat: TRIB & TRIP Generador v2 — Prompt generator mejorado [$TIMESTAMP]"
echo -e "      ${GRN}✓${NC} Commit creado"

# ── 5. Push ───────────────────────────────────────────────────────────────────
echo -e "${YEL}[5/5]${NC} Publicando en GitHub..."
git push origin "$BRANCH"
echo -e "      ${GRN}✓${NC} Push completado"

# ── Limpieza ──────────────────────────────────────────────────────────────────
cd /
rm -rf "$TMP_DIR"

# ── Resumen ───────────────────────────────────────────────────────────────────
echo ""
echo -e "${GRN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GRN}  ✦ Deploy completado correctamente${NC}"
echo -e "${GRN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  🌐 URL: ${BLU}https://tribandtrip.github.io/trip-itinerary/${NC}"
echo -e "  ⏱  GitHub Pages puede tardar 1-2 minutos en actualizar"
echo ""

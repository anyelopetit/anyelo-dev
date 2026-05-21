# PRD.md

# anyelo.dev

## 1. Resumen Ejecutivo

`anyelo.dev` sera el sitio profesional principal de Anyelo: una landing premium con blog ligero y captura de leads, construida sobre una arquitectura `Cloudflare Pages + Pages Functions` con enfoque `serverless`, `edge-first`, `SEO-first` y costo operativo minimo.

El sitio debe posicionar a Anyelo como:

1. Senior Software Engineer
2. Founder Engineer
3. Software Architect
4. experto en automatizacion
5. experto en IA aplicada
6. creador de productos reales para LATAM

La experiencia visual debe sentirse:

1. humana
2. premium
3. cinematografica
4. elegante
5. limpia
6. moderna
7. confiable

No debe sentirse:

1. influencer generico de IA
2. sitio crypto
3. template futurista barato
4. landing sobrecargada
5. demo visual sin sustancia

## 2. Vision del Producto

Construir una presencia digital que transmita seniority real en menos de 10 segundos y que convierta interes en conversaciones comerciales de alta calidad.

El visitante debe concluir rapidamente:

1. Anyelo construye software serio
2. entiende producto, negocio y arquitectura
3. puede ejecutar MVPs, SaaS, automatizaciones y sistemas complejos
4. sabe comunicar con claridad y criterio
5. vale la pena contratarlo o invitarlo a una oportunidad

## 3. Objetivos de Negocio

### 3.1 Objetivos primarios

1. generar leads calificados para desarrollo de productos digitales
2. vender servicios de software, automatizacion, IA, APIs, dashboards y arquitectura
3. mostrar experiencia real con proyectos y resultados
4. elevar la percepcion profesional frente a empresas y founders

### 3.2 Objetivos secundarios

1. servir de hub para LinkedIn, GitHub e Instagram
2. preparar la base de un blog tecnico/editorial
3. crear infraestructura para futuras paginas de case studies

### 3.3 Objetivos de conversion

1. click en CTA del hero
2. click en CTA de proyectos
3. envio exitoso del formulario
4. click en enlaces sociales
5. click hacia blog o articulos destacados

## 4. Audiencia

### 4.1 Audiencia primaria

1. founders
2. startups LATAM
3. duenos de negocio
4. empresas que necesitan software a medida
5. equipos que buscan un ingeniero senior o staff-level individual contributor

### 4.2 Audiencia secundaria

1. CTOs
2. Product Managers
3. recruiters
4. peers tecnicos

## 5. Propuesta de Valor

Anyelo no solo desarrolla software. Disena y construye soluciones digitales reales que mejoran operaciones, aceleran negocio y convierten ideas complejas en productos funcionales, escalables y bien ejecutados.

La propuesta debe comunicar simultaneamente:

1. profundidad tecnica
2. pensamiento de producto
3. enfoque de negocio
4. sensibilidad UX
5. capacidad de ejecucion end-to-end

## 6. Principios Rectores

### 6.1 Principios de marca

1. autoridad tranquila sobre autopromocion agresiva
2. claridad sobre buzzwords
3. productos reales sobre promesas vacias
4. sobriedad sobre show visual
5. confianza sobre dramatismo

### 6.2 Principios de diseno

1. mucho aire visual
2. fondos oscuros suaves con iluminacion controlada
3. tipografia premium y jerarquia editorial fuerte
4. motion sutil con proposito
5. composicion cuidada para desktop y mobile

### 6.3 Principios de ingenieria

1. HTML semantico primero
2. JavaScript minimo con alto impacto
3. design tokens como fuente de verdad
4. sin colores hardcodeados en la capa final
5. performance y accesibilidad como requisitos base

## 7. Stack Tecnologico Aprobado

1. HTML5 semantico
2. TailwindCSS
3. GSAP
4. Lenis Smooth Scroll
5. Alpine.js opcional
6. JavaScript modular vanilla
7. Cloudflare Pages
8. Cloudflare Pages Functions
9. Cloudflare WAF
10. Cloudflare Rate Limiting
11. Zoho Mail
12. Resend opcional y recomendado para envio transaccional
13. Lucide Icons

## 8. Stack Explicitamente Excluido

1. React
2. Next.js
3. TypeScript
4. backend tradicional
5. Rails
6. SPA compleja

## 9. Arquitectura General

### 9.1 Hosting y delivery

1. dominio: `anyelo.dev`
2. DNS: `Cloudflare DNS`
3. hosting estatico: `Cloudflare Pages`
4. backend serverless: `Cloudflare Pages Functions`
5. seguridad perimetral: `Cloudflare WAF + Rate Limiting`

### 9.2 Flujo de request principal

1. usuario solicita `https://anyelo.dev`
2. Cloudflare Pages entrega HTML, CSS, JS e imagenes desde edge
3. el sitio carga contenido principal sin depender de API inicial
4. el formulario envia `POST /api/contact`
5. Pages Function valida, sanea y reenvia por proveedor de email
6. Cloudflare protege el endpoint por pais, metodo y frecuencia

### 9.3 ADRs clave

#### ADR-01: Static-first

Decision:
servir la capa publica como sitio estatico.

Razon:

1. maxima velocidad
2. minima complejidad
3. muy bajo costo
4. mejor superficie para SEO

#### ADR-02: Serverless form

Decision:
usar `Pages Functions` para `/api/contact`.

Razon:

1. elimina backend persistente
2. integra seguridad Cloudflare de forma nativa
3. simplifica deploy y mantenimiento

#### ADR-03: Email provider

Decision recomendada:
usar `Resend` como proveedor HTTP y `Zoho Mail` como inbox receptor.

Razon:

1. mejor compatibilidad con runtime serverless
2. menor complejidad que SMTP clasico
3. mejor observabilidad inicial

#### ADR-04: Motion

Decision:
usar `GSAP` para motion principal y `Lenis` para smooth scroll.

Razon:

1. control fino
2. rendimiento alto
3. no requiere framework

## 10. Estructura del Proyecto

```text
/public
/assets
/assets/images
/assets/fonts
/assets/icons
/styles
/styles/base
/styles/components
/styles/utilities
/scripts
/scripts/animations
/scripts/components
/scripts/utils
/design
/functions
/functions/api
/config
```

### 10.1 Archivos clave esperados

```text
/public/index.html
/public/blog/index.html
/public/robots.txt
/public/sitemap.xml
/public/site.webmanifest

/assets/images/hero/anyelo-portrait.avif
/assets/images/projects/
/assets/images/og/og-home.jpg
/assets/images/og/og-blog.jpg

/styles/base/tokens.css
/styles/base/theme.css
/styles/base/typography.css
/styles/components/buttons.css
/styles/components/cards.css
/styles/components/forms.css
/styles/utilities/semantic.css
/styles/app.css

/scripts/app.js
/scripts/components/header.js
/scripts/components/mobile-menu.js
/scripts/components/contact-form.js
/scripts/components/scroll-spy.js
/scripts/animations/hero.js
/scripts/animations/reveal.js
/scripts/animations/projects.js
/scripts/animations/timeline.js
/scripts/animations/cta.js
/scripts/animations/lenis.js

/design/design_tokens.yml
/config/site_content.json
/config/blog_content.json

/functions/api/contact.js
```

## 11. Design System

### 11.1 Fuente de verdad

Debe existir:

`/design/design_tokens.yml`

Debe ser la fuente principal para:

1. colores
2. tipografia
3. spacing
4. radios
5. sombras
6. breakpoints
7. timing de animacion
8. semantic aliases

### 11.2 Tokens obligatorios

#### Colors

1. `background`
2. `surface`
3. `surface_alt`
4. `border`
5. `card`
6. `primary`
7. `secondary`
8. `accent`
9. `success`
10. `warning`
11. `danger`
12. `text_primary`
13. `text_secondary`
14. `text_muted`

#### Typography

1. font families
2. font sizes
3. line heights
4. letter spacing
5. font weights

#### Spacing

1. spacing scale completa

#### Shadows

1. `soft`
2. `medium`
3. `large`
4. `glow`

#### Border Radius

1. `sm`
2. `md`
3. `lg`
4. `xl`
5. `2xl`
6. `full`

#### Breakpoints

1. `mobile`
2. `tablet`
3. `laptop`
4. `desktop`
5. `ultrawide`

#### Animations

1. `duration_fast`
2. `duration_normal`
3. `duration_slow`
4. `easing_primary`
5. `easing_secondary`

### 11.3 Direccion visual de tokens

Basado en tu brief y en las referencias `desktop.png` y `mobile.png`, la direccion de sistema debe ser:

1. fondo base oscuro azul-carbon
2. texto principal blanco calido
3. texto secundario gris humo
4. acento principal violeta/azul sobrio
5. acento secundario dorado calido para CTAs en mobile o highlights puntuales
6. bordes visibles pero suaves
7. sombras profundas y elegantes, no ruidosas

### 11.4 Tipografia recomendada

La skill sugirio `Archivo + Space Grotesk` por su perfil limpio/minimal. Para este proyecto se acepta esa direccion como base, pero el sistema debe decidir entre dos combinaciones finales:

1. `Archivo` para headlines + `Space Grotesk` para body
2. `General Sans` o equivalente premium para display + `Inter` para body

Decision esperada:

1. si se prioriza caracter editorial: `Archivo + Space Grotesk`
2. si se prioriza neutralidad premium mas corporativa: `General Sans + Inter`

### 11.5 Reglas obligatorias del sistema

1. no hardcodear hex en componentes finales
2. no usar `bg-black` o `text-white` como solucion final de producto
3. todos los colores deben salir de tokens semanticos
4. todo componente visual recurrente debe tener clase semantica

## 12. Integracion Tailwind

### 12.1 Estrategia

1. `design_tokens.yml` define el sistema
2. un paso de build genera `tokens.css`
3. `tokens.css` define CSS variables en `:root`
4. Tailwind extiende theme con esas variables
5. los componentes usan clases semanticas en lugar de colores literales

### 12.2 Clases semanticas obligatorias

1. `bg-background`
2. `bg-surface`
3. `bg-surface-alt`
4. `bg-card`
5. `text-primary`
6. `text-secondary`
7. `text-muted`
8. `border-default`
9. `shadow-soft`
10. `shadow-medium`
11. `shadow-large`
12. `shadow-glow`

### 12.3 Clases de componente esperadas

1. `btn-primary`
2. `btn-secondary`
3. `premium-card`
4. `floating-card`
5. `section-shell`
6. `section-eyebrow`
7. `section-title`
8. `input-shell`
9. `metric-card`

### 12.4 Dark theme strategy

El tema por defecto del MVP sera oscuro premium.

Sin embargo:

1. la arquitectura debe quedar lista para tema claro futuro
2. los tokens deben permitir `[data-theme="light"]`
3. ninguna decision de layout debe depender exclusivamente del fondo oscuro

## 13. Referencias Visuales Reales del Proyecto

### 13.1 Desktop reference: `images/desktop.png`

Comportamientos que deben preservarse o refinarse:

1. hero split con copy a la izquierda y retrato protagonista a la derecha
2. header flotante con margen superior y laterales, no pegado a los bordes
3. primera mitad del sitio sobre fondo oscuro
4. transicion editorial a bloques claros para about, projects y services
5. CTA/footer final vuelve a bloque oscuro premium

### 13.2 Mobile reference: `images/mobile.png`

Comportamientos que deben preservarse o refinarse:

1. hero reordenado con foto dominante arriba
2. copy corto y contundente bajo la foto
3. CTAs apilados y faciles de tocar
4. metricas en bloque compacto bajo hero
5. about en layout simple de lectura vertical
6. projects en cards apiladas, con screenshots muy protagonistas
7. services como lista/tarjetas verticales de alta legibilidad
8. experience como timeline vertical limpia
9. CTA final de alto contraste, muy facil de accionar

### 13.3 Asset personal: `images/anyelo.png`

Reglas de uso:

1. el retrato debe ser el elemento humano central del hero
2. debe recibir luz ambiental sutil detras, no contorno artificial exagerado
3. no debe deformarse ni recortarse agresivamente en mobile
4. debe existir version optimizada AVIF y WebP derivada del asset original

## 14. Arquitectura de Informacion

### 14.1 Navegacion principal

1. Inicio
2. Sobre mi
3. Proyectos
4. Servicios
5. Experiencia
6. Blog
7. Contacto

### 14.2 Orden de homepage

1. Header
2. Hero
3. Trust Bar
4. About
5. Experience
6. Projects
7. Services
8. Process
9. Tech Stack
10. Testimonials
11. Companies
12. Blog Preview
13. CTA Section
14. Contact Form
15. Footer

## 15. Especificacion de Secciones

### 15.1 Header

#### Objetivo

Navegacion clara y premium con CTA persistente.

#### Elementos obligatorios

1. logo o monograma
2. navegacion
3. CTA principal
4. mobile menu
5. blur navbar
6. sticky behavior

#### Reglas UX

1. navbar flotante con `top` visible, no pegada al viewport
2. compensar altura del header para no tapar el hero
3. targets tactiles de 44x44 minimo
4. `focus-visible` claro

#### Animaciones

1. shrink on scroll
2. hover underline
3. smooth transitions

### 15.2 Hero Section

#### Objetivo

Ser la seccion visual y comercial mas importante.

#### Elementos obligatorios

1. fotografia profesional real
2. headline fuerte
3. subheadline
4. metricas
5. badges
6. CTAs
7. social proof
8. floating cards

#### Reglas de contenido

El mensaje debe comunicar:

1. ingenieria senior
2. impacto real
3. experiencia en productos
4. automatizacion e IA con criterio

#### Reglas responsive derivadas de referencias

Desktop:

1. headline multilinea grande
2. retrato ocupa casi toda la altura visible del hero
3. metricas debajo de CTAs
4. copy no debe exceder ancho editorial ideal

Mobile:

1. foto primero
2. headline corto y contundente
3. cuerpo de texto con minimo `16px`
4. CTAs apilados
5. metricas en grid compacto

#### Animaciones

1. text reveal
2. stagger
3. subtle parallax
4. glow movement
5. fade transitions

### 15.3 Trust Bar

Debe mostrar:

1. tecnologias
2. expertise
3. industrias
4. herramientas

Reglas:

1. no competir con el hero
2. monocromo o muy contenido
3. puede usar logos, pills o frases cortas

### 15.4 About Section

Debe explicar:

1. quien soy
2. como pienso
3. enfoque profesional
4. filosofia de ingenieria

Con:

1. cards
2. stats
3. editorial layout

Reglas:

1. no parecer CV plano
2. conectar tecnologia con resultados de negocio
3. mantener legibilidad alta en mobile

### 15.5 Experience Section

Timeline elegante mostrando:

1. experiencia
2. tecnologias
3. impacto
4. anos

Requisitos:

1. linea guia clara
2. hitos con suficiente aire
3. legibilidad alta en mobile

### 15.6 Projects Section

Debe incluir:

1. screenshots
2. case studies
3. stack
4. arquitectura
5. problemas resueltos
6. resultados

Proyectos obligatorios:

1. Pidy
2. Livy
3. Predio
4. LegalRadar
5. Agnostic OS

#### Requisito narrativo por proyecto

Cada proyecto debe responder:

1. que problema resolvia
2. para quien
3. que stack o arquitectura uso
4. que valor genero

#### Animaciones

1. hover scale minimo
2. stagger reveal
3. smooth transitions
4. magnetic hover sutil

### 15.7 Services Section

Servicios obligatorios:

1. SaaS
2. automatizacion
3. IA
4. APIs
5. dashboards
6. MVPs
7. arquitectura
8. UX engineering

Reglas:

1. lenguaje orientado a negocio
2. cards o lista premium
3. CTA contextual por servicio opcional

### 15.8 Process Section

Metodologia obligatoria:

1. Discovery
2. Strategy
3. Design
4. Build
5. Optimization
6. Scale

Cada etapa debe explicar:

1. que se hace
2. que reduce riesgo
3. que entregable produce

### 15.9 Tech Stack Section

Mostrar:

1. Rails
2. PostgreSQL
3. Tailwind
4. Hotwire
5. Docker
6. APIs
7. IA Tools
8. Cloudflare

Nota:

1. `Rails` y `Hotwire` forman parte del expertise aunque esta web no se construya con ese stack

### 15.10 Testimonials

Cards premium animadas.

Reglas:

1. priorizar pocos testimonios fuertes
2. no usar slider agresivo
3. si no hay suficientes testimonios reales, usar grid pequena y sobria

### 15.11 Companies Section

Sectores obligatorios:

1. startups
2. restaurantes
3. condominios
4. SaaS
5. legaltech
6. negocios LATAM

### 15.12 Blog Preview Section

Objetivo:

1. presentar el blog como extension de autoridad intelectual

Contenido:

1. heading editorial
2. 2-3 articulos destacados
3. CTA `Ver blog`

Temas esperados:

1. automatizacion
2. arquitectura
3. SaaS
4. IA aplicada
5. productividad y sistemas

### 15.13 CTA Section

Gran seccion emocional/cinematografica.

Debe incluir:

1. headline emocional
2. supporting copy
3. CTA principal
4. fondo sobrio premium

### 15.14 Contact Form

Campos obligatorios:

1. nombre
2. email
3. empresa
4. presupuesto
5. mensaje

Requisitos UX:

1. labels reales
2. validacion cercana al campo
3. boton con loading state
4. exito claro
5. error claro
6. no usar placeholders como unico label

### 15.15 Footer

Debe incluir:

1. marca
2. claim breve
3. links secundarios
4. redes
5. copyright
6. accion de volver arriba opcional

## 16. Arquitectura del Blog

### 16.1 Objetivo

Mantener un blog pequeno, rapido y SEO-friendly sin agregar complejidad de CMS pesado.

### 16.2 Alcance MVP

1. index de blog
2. pagina de articulo individual
3. metadata y Open Graph por articulo
4. enlaces desde homepage

### 16.3 Estrategia tecnica

Opciones aceptadas:

1. generar HTML estatico desde Markdown en build
2. mantener articulos como archivos JSON/Markdown procesados al build

### 16.4 IA del blog

1. `/blog/`
2. `/blog/<slug>/`

### 16.5 SEO del blog

1. canonical por articulo
2. schema `BlogPosting`
3. tabla de contenidos opcional si el contenido es largo
4. lectura optimizada para 65-75 caracteres por linea

## 17. Motion Design Philosophy

Las animaciones deben sentirse:

1. suaves
2. cinematograficas
3. elegantes
4. premium
5. modernas

No deben sentirse:

1. exageradas
2. distractoras
3. caricaturescas

### 17.1 GSAP

Usar GSAP para:

1. scroll reveal
2. stagger
3. pinned sections solo si agregan valor real
4. parallax
5. text reveal
6. horizontal motion muy controlado

### 17.2 Que se anima y por que

1. hero: establecer impacto inicial con elegancia
2. cards: reforzar jerarquia y calidad tactil
3. timeline: ayudar al scanning visual
4. CTA: aumentar atencion sin agresividad

### 17.3 Lenis

Implementar smooth scroll premium con reglas:

1. sin lag perceptible
2. integrado con ScrollTrigger
3. desactivable o reducido con `prefers-reduced-motion`

### 17.4 Reglas de performance en motion

1. usar `transform` y `opacity`
2. evitar `width`, `height`, `top`, `left` para motion continuo
3. microinteracciones entre `150ms` y `300ms`
4. evitar animaciones infinitas decorativas

## 18. Arquitectura del Formulario

### 18.1 Endpoint

`POST /api/contact`

### 18.2 Validaciones frontend

1. `name` requerido, 2-80 chars
2. `email` requerido, formato valido, max 120 chars
3. `company` opcional, max 120 chars
4. `budget` requerido
5. `message` requerido, 20-1500 chars
6. `website` honeypot vacio

### 18.3 Validaciones serverless

1. solo `POST`
2. validar `Content-Type`
3. sanitizacion de strings
4. normalizacion de whitespace
5. validacion de longitud
6. validacion de email
7. rechazo de honeypot lleno
8. allowlist de campos esperados
9. anti injection

### 18.4 Payload esperado

```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "budget": "string",
  "message": "string",
  "website": ""
}
```

### 18.5 Respuesta esperada

Success:

```json
{
  "ok": true,
  "message": "Mensaje enviado correctamente."
}
```

Error:

```json
{
  "ok": false,
  "message": "No fue posible enviar el mensaje.",
  "fieldErrors": {
    "email": "Ingresa un correo valido."
  }
}
```

## 19. Email Delivery

### 19.1 Flujo recomendado

1. frontend envia `POST /api/contact`
2. Pages Function valida payload
3. function llama API de `Resend`
4. Resend entrega a inbox `Zoho Mail`
5. frontend recibe exito o error

### 19.2 Variables de entorno

1. `RESEND_API_KEY`
2. `CONTACT_FROM_EMAIL`
3. `CONTACT_TO_EMAIL`
4. `CONTACT_REPLY_TO_EMAIL`
5. `TURNSTILE_SECRET_KEY` opcional
6. `ALLOWED_ORIGIN`

### 19.3 Seguridad de envio

1. nunca exponer secretos al cliente
2. nunca usar input del usuario en headers sin sanitizar
3. registrar errores tecnicos sin filtrar detalles al usuario

### 19.4 Manejo de errores

1. distinguir error de validacion y error de proveedor
2. responder con mensaje amigable
3. no exponer stack traces

## 20. Cloudflare Security

### 20.1 Rate limiting

Requisito:

1. maximo `2 requests`
2. cada `5 minutos`
3. por IP
4. solo en `/api/contact`

Regla objetivo:

Condicion:

```text
(http.request.uri.path eq "/api/contact" and http.request.method eq "POST")
```

Accion recomendada:

1. `Block` al exceder el threshold

### 20.2 Geo blocking

Paises permitidos:

1. Venezuela
2. Colombia
3. Chile
4. Mexico
5. Argentina
6. Uruguay
7. Peru
8. Bolivia
9. Ecuador
10. Costa Rica
11. Panama
12. Estados Unidos

Expresion objetivo:

```text
(http.request.uri.path eq "/api/contact" and not ip.geoip.country in {"VE" "CO" "CL" "MX" "AR" "UY" "PE" "BO" "EC" "CR" "PA" "US"})
```

Accion:

1. `Block`

### 20.3 WAF rules

#### Rule 1: Geo block

```text
(http.request.uri.path eq "/api/contact" and not ip.geoip.country in {"VE" "CO" "CL" "MX" "AR" "UY" "PE" "BO" "EC" "CR" "PA" "US"})
```

Accion:
`Block`

#### Rule 2: Method guard

```text
(http.request.uri.path eq "/api/contact" and http.request.method ne "POST")
```

Accion:
`Block`

#### Rule 3: Bot hardening opcional

```text
(http.request.uri.path eq "/api/contact" and cf.bot_management.score lt 30)
```

Accion:
`Managed Challenge`

### 20.4 Challenge strategy

Usar `Managed Challenge` solo si el spam real lo justifica.

### 20.5 Block strategy

Bloquear directamente:

1. pais no permitido
2. metodo invalido
3. exceso de requests

## 21. Cloudflare Turnstile

Integracion opcional.

Activar si:

1. honeypot + rate limit no bastan
2. empieza a llegar spam persistente

Flujo:

1. frontend renderiza Turnstile
2. usuario obtiene token
3. token se envia al endpoint
4. Pages Function valida con Cloudflare
5. si falla, rechazar envio

## 22. Performance

### 22.1 Metas

1. Lighthouse Performance `> 95`
2. Lighthouse Accessibility `> 95`
3. Lighthouse Best Practices `> 95`
4. Lighthouse SEO `> 95`

### 22.2 Core Web Vitals

1. LCP `< 1.8s`
2. CLS `< 0.03`
3. INP `< 150ms`

### 22.3 Requisitos

1. lazy loading fuera del hero
2. preload de fuentes criticas
3. preload de hero image
4. AVIF/WebP
5. minimizar JS
6. reservar espacio para evitar CLS

### 22.4 Estrategia de imagenes

1. hero image en AVIF con fallback WebP
2. screenshots optimizados por breakpoint
3. dimensiones explicitas en todas las imagenes
4. `fetchpriority="high"` para hero

### 22.5 Estrategia de fuentes

1. self-hosted cuando sea posible
2. `font-display: swap`
3. solo variantes necesarias

## 23. SEO

Debe incluir:

1. semantic HTML
2. Open Graph
3. Twitter Cards
4. canonical URLs
5. `robots.txt`
6. `sitemap.xml`
7. JSON-LD
8. schema.org
9. metadata strategy

### 23.1 Metadata homepage

Title ejemplo:

`Anyelo | Senior Software Engineer, SaaS, Automation & Applied AI`

Description ejemplo:

`Ingeniero de software senior con 10+ anos construyendo SaaS, automatizaciones, dashboards, sistemas administrativos e IA aplicada para negocios reales en LATAM.`

### 23.2 JSON-LD recomendado

1. `Person`
2. `ProfessionalService`
3. `WebSite`
4. `BlogPosting` para articulos

## 24. Accesibilidad

Debe cumplir:

1. contrastes correctos
2. keyboard navigation
3. focus states
4. reduced motion
5. semantic structure

### 24.1 Reglas obligatorias derivadas de skill UX

1. contraste minimo 4.5:1
2. labels reales en formulario
3. `aria-label` para icon-only buttons
4. `focus-visible:ring-2` o equivalente
5. no usar color como unico indicador

### 24.2 Touch & interaction

1. touch targets minimo 44x44
2. deshabilitar boton al enviar formulario
3. feedback claro de exito/error
4. `cursor-pointer` en elementos clickeables

## 25. Responsive Strategy

La web debe sentirse disenada especificamente para:

1. mobile
2. tablet
3. desktop
4. ultrawide

### 25.1 Reglas generales

1. mobile-first
2. `16px` minimo en body mobile
3. paddings responsivos tipo `px-4 sm:px-6 lg:px-8`
4. sin scroll horizontal
5. z-index scale clara: `10, 20, 30, 50`

### 25.2 Mobile UX obligatorio

1. spacing premium
2. thumb-friendly interactions
3. tipografia optimizada
4. sticky CTA opcional en tramos largos
5. animaciones simplificadas
6. navbar clara y compacta

### 25.3 Desktop UX obligatorio

1. composicion cinematografica
2. hero con profundidad y aire
3. alineacion editorial entre secciones

## 26. Implementacion Notes

### 26.1 HTML

1. un solo `h1`
2. anchors estables por seccion
3. contenido visible sin JS

### 26.2 CSS

1. Tailwind para layout y spacing
2. semantic utilities para lenguaje visual
3. CSS complementario para componentes premium

### 26.3 JS

1. `app.js` orquesta inicializacion
2. cada modulo verifica si el nodo existe
3. no acoplar form con el resto de animaciones

## 27. Riesgos

### 27.1 Riesgos de producto

1. priorizar look sobre claridad
2. mostrar demasiados servicios sin foco
3. proyectos sin suficiente contexto

### 27.2 Riesgos tecnicos

1. sobreusar GSAP
2. introducir jank con Lenis en mobile
3. no centralizar tokens
4. intentar SMTP complejo dentro de Functions

### 27.3 Riesgos visuales

1. parecer template premium generico
2. usar glow excesivo
3. perder contraste en bloques claros

## 28. Fases de Implementacion

### Fase 0: Contenido y assets

1. cerrar copy
2. definir screenshots finales
3. optimizar `anyelo.png`

### Fase 1: Fundaciones

1. estructura de carpetas
2. pipeline de tokens
3. shell HTML principal

### Fase 2: Design system

1. `design/design_tokens.yml`
2. semantic utilities
3. buttons, cards, forms

### Fase 3: Homepage core

1. header
2. hero
3. about
4. projects

### Fase 4: Secciones de autoridad

1. experience
2. services
3. process
4. tech stack
5. testimonials
6. companies
7. blog preview

### Fase 5: Conversion

1. CTA
2. contact form
3. footer

### Fase 6: Motion

1. GSAP
2. Lenis
3. reveals
4. hover states

### Fase 7: Cloudflare setup

1. Pages
2. Functions
3. env vars
4. WAF
5. rate limiting
6. geo block
7. Turnstile opcional

### Fase 8: Hardening

1. SEO
2. accessibility
3. performance
4. QA responsive

## 29. Criterios de Exito

El proyecto sera exitoso si:

1. transmite seniority y confianza en menos de 10 segundos
2. muestra experiencia real con claridad
3. se ve increible en mobile
4. Lighthouse se mantiene por encima de 95
5. el formulario genera leads sin abrir superficie seria de spam
6. la arquitectura queda mantenible y barata de operar

## 30. Definicion de Done

El proyecto se considera terminado cuando:

1. existe homepage completa con todas las secciones obligatorias
2. existe blog base con index y detalle
3. el sistema visual se apoya en `design/design_tokens.yml`
4. el formulario funciona end-to-end via `Pages Functions`
5. las reglas de WAF, geo y rate limiting estan configuradas
6. SEO tecnico base esta completo
7. responsive desktop/mobile refleja la calidad mostrada en `desktop.png` y `mobile.png`
8. las animaciones elevan la experiencia sin comprometer rendimiento

## 31. Regla Final de Producto

Toda decision visual, tecnica o de contenido debe responder esta pregunta:

`Esto hace que anyelo.dev se sienta mas premium, mas claro y mas creible para una empresa o cliente real?`

Si la respuesta es no:

1. se simplifica
2. se elimina
3. o se rediseña

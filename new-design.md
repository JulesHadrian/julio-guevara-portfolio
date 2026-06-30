DOCUMENTO DE REQUERIMIENTOS
Portafolio Software Engineer + CRO
Inspirado en Synapser Studio
Brief de diseno, UX, contenido, front-end, animaciones, SEO, accesibilidad, tracking y criterios de aceptacion para construir una experiencia premium tipo estudio creativo.
  Swiss editorial     Creative portfolio     Motion-led     CRO proof     Engineering credibility   
Version 1.0 | Preparado para implementacion en Next.js/React o stack equivalente
 
Indice del documento
•	1. Resumen ejecutivo y alcance
•	2. Lectura de la referencia Synapser Studio
•	3. Concepto recomendado para tu portafolio
•	4. Arquitectura de informacion y estructura por pagina
•	5. Requerimientos funcionales
•	6. Requerimientos visuales y sistema de diseno
•	7. Componentes UI
•	8. Animacion, microinteracciones y comportamiento
•	9. Contenido, copy y modelo de case studies
•	10. CRO, analitica y medicion
•	11. Stack tecnico e implementacion
•	12. Performance, SEO y accesibilidad
•	13. Entregables, backlog y criterios de aceptacion
Uso del documento
Este archivo no propone copiar el sitio de referencia. Lo convierte en un sistema original y aplicable a un portafolio personal de ingenieria de software y CRO, preservando la inspiracion: editorialidad, movimiento, precision visual y presentacion de proyectos por narrativa.

1. Resumen ejecutivo y alcance
Objetivo del proyecto: redisenar el portafolio personal para que comunique una combinacion rara y valiosa: capacidad de construir software, criterio de experiencia de usuario, mentalidad de experimentacion CRO y orientacion a resultados medibles.
Tipo de producto	Portafolio personal premium / estudio individual de software, CRO y experiencias digitales.
Objetivo principal	Convertir visitantes cualificados en conversaciones: leads, entrevistas, colaboraciones o solicitudes de auditoria.
Audiencia primaria	Fundadores, ecommerce managers, marketing leads, product managers, agencias y empresas que buscan mejorar conversion.
Audiencia secundaria	Recruiters tecnicos, equipos de producto, directores de tecnologia y partners de agencia.
Tono deseado	Senior, preciso, creativo, tecnico, orientado a negocio; menos "developer portfolio" y mas "growth engineering studio".
Inspiracion principal	Synapser Studio: navegacion numerada, narrativa visual, proyecto como pieza editorial, motion, works/archive y servicios por disciplina.
Restriccion clave	Inspirarse en sistema, estructura y lenguaje visual sin reproducir assets, textos, layouts exactos o identidad de marca.

Resultado esperado
Un sitio con home, casos de estudio, archivo, manifiesto/about y contacto. Debe sentirse como una mezcla entre landing de estudio creativo, dashboard de crecimiento y portafolio tecnico. Cada seccion debe reforzar que el propietario no solo entrega interfaces, sino sistemas digitales que se pueden medir y optimizar.
2. Lectura de la referencia Synapser Studio
La referencia revisada presenta una home con navegacion numerada: 001 / Homepage, 002 / Manifesto y 003 / Archive; un bloque hero narrativo con frases como "Crafting Digital Experiences from Lisbon"; una seccion WORKS; y servicios como Brand Strategy, Interface Design, Immersive & Motion y Engineering. La pagina Manifesto define el estudio como un atelier digital en Lisboa y enumera capacidades como 3D, website design, website development, software development, photogrammetry, branding, video editing, UI/UX design y digital signage. Las paginas de proyecto muestran titulo, descripcion, servicios, industria, ubicacion e imagenes de dispositivos.
Principios extraidos de la referencia
1) Navegacion editorial con numeracion. 2) Hero construido como narrativa, no como bloque corporativo. 3) Proyectos tratados como piezas de archivo. 4) Movimiento y scroll como parte de la identidad. 5) Servicios agrupados por disciplinas. 6) Lenguaje visual sobrio, preciso y artesanal.

Patron visible	Home inmersiva + manifiesto + archivo de trabajos + detalle de proyecto.
Tipo de storytelling	Frases cortas, ritmo editorial, vocabulario de craft, precision, tecnologia y experiencias.
Navegacion	Menu minimal, paginas numeradas, cambio de idioma, CTA de email/contacto.
Interaccion esperada	Scroll guiado, drag/cursor contextual, movimiento de proyectos e imagenes.
Estructura de trabajos	Listado visual, titulo de proyecto, servicios, industria, ubicacion y link de proyecto.
Adaptacion para tu caso	Cambiar el lenguaje de agencia creativa por growth engineering: construir, medir, optimizar.

3. Concepto recomendado para tu portafolio
Territorio creativo
Growth Engineering Atelier: una identidad que une software, experimentacion, medicion y craft visual. El sitio debe decir, sin explicarlo demasiado, que eres capaz de disenar experiencias premium, construirlas bien y demostrar impacto con datos.
Tagline principal	I build conversion-focused digital experiences. / Desarrollo experiencias digitales enfocadas en conversion.
Promesa	Combino software engineering, CRO, UX y analitica para convertir sitios y productos digitales en sistemas medibles de crecimiento.
Diferenciador	No eres solo implementador; diagnosticas friccion, formulas hipotesis, construyes soluciones y mides resultados.
Prueba	Case studies con problema, intervencion, stack, metrica y aprendizaje.
CTA recomendado	Audit my funnel / Hablemos de tu funnel / Ver case studies.

Pilares de comunicacion
Pilar	Mensaje	Evidencia visual	Contenido
Build	Construyes software robusto y performante.	Snippets, stack tags, UI screens, architecture cards.	React, Next.js, Shopify, Liquid, TypeScript, APIs.
Optimize	Detectas y reduces friccion de conversion.	Funnels, before/after, UX annotations, heatmap-like cards.	Landing pages, checkout, forms, PDPs, UX heuristics.
Measure	Mides impacto y conviertes decisiones en datos.	Metric cards, dashboards, event maps, experiment IDs.	GA4, GTM, Looker Studio, A/B testing, Clarity/Hotjar.

4. Arquitectura de informacion y estructura por pagina
Mapa de sitio recomendado
•	001 / Home: introduccion narrativa, metric cards, pilares, trabajos destacados, servicios, proceso y CTA final.
•	002 / Manifesto: historia, filosofia de trabajo, principios, capacidades y metodo.
•	003 / Archive: grid/listado filtrable de case studies, proyectos, experimentos y piezas tecnicas.
•	004 / Case Study: pagina individual con problema, contexto, intervencion, stack, medicion, resultados y aprendizajes.
•	005 / Contact: formulario breve, agenda, email, redes profesionales y disponibilidad.
Estructura propuesta de Home
ID	Requerimiento	Prioridad	Criterio de aceptacion	Notas
HOME-01	Preloader editorial: contador 00-100%, microcopy corto y entrada suave.	MVP	El usuario ve progreso maximo 1.2 s; se omite si reduce-motion esta activo o si carga instantaneamente.	Inspirado en el contador observado en la referencia.
HOME-02	Header minimal sticky con logo textual, menu numerado, idioma y CTA.	MVP	Navegacion visible, accesible por teclado, contraste AA y menu mobile funcional.	Usar 001/Home, 002/Manifesto, 003/Archive.
HOME-03	Hero narrativo con titulo grande, subtitulo de valor y metric card.	MVP	El usuario entiende en 5 segundos que construyes y optimizas experiencias digitales.	Incluir una frase principal y rotacion de keywords.
HOME-04	Keyword orbit/marquee: engineering, CRO, analytics, experiments, UX, performance.	Alta	El movimiento se pausa en hover y respeta prefers-reduced-motion.	No saturar; usar como textura editorial.
HOME-05	Bloque de manifiesto breve con 6 a 8 lineas grandes.	MVP	Texto legible en desktop y mobile; cada linea tiene ritmo visual.	Reemplaza frases de agencia por narrativa de growth.
HOME-06	Works destacados: 3 a 5 case studies con imagen, tipo, rol, stack y resultado.	MVP	Cada card lleva a una pagina de case study y muestra una metrica o resultado.	Priorizar calidad sobre cantidad.
HOME-07	Servicios/capacidades: Build, Optimize, Measure, Advisory.	MVP	Cada servicio incluye descripcion, entregables y tags.	Evita lista generica de tecnologias.
HOME-08	Proceso: Diagnose, Hypothesize, Build, Test, Learn.	MVP	Seccion escaneable con 5 pasos y resultado de cada etapa.	Conectar con CRO.
HOME-09	CTA final orientado a negocio.	MVP	Incluye boton primario, secundario y email visible.	Mensaje: sitio con trafico que no convierte.

Estructura de pagina Case Study
•	Hero: titulo, tipo de proyecto, ano, cliente o contexto anonimizado, rol y resultado principal.
•	Contexto: problema de negocio, friccion detectada, estado inicial y limitaciones.
•	Diagnostico: datos, heuristicas UX, eventos, findings cualitativos y oportunidades.
•	Intervencion: decisiones de diseno, cambios de frontend, tracking y experimentacion.
•	Resultado: metricas, impacto, aprendizaje y siguiente iteracion. Si no hay datos publicables, usar indicadores cualitativos o rangos.
•	Galeria: screenshots, before/after, annotated UI, responsive screens, code/architecture snippets.
•	Footer: siguiente proyecto y CTA de contacto.
5. Requerimientos funcionales
ID	Requerimiento	Prioridad	Criterio de aceptacion	Notas
FUNC-01	Navegacion global con menu numerado, estado activo y enlaces a secciones/paginas.	MVP	Todos los enlaces funcionan, tienen focus visible y estado hover.	Header desktop + drawer mobile.
FUNC-02	Cambio de idioma ES/EN.	Alta	El usuario puede alternar idioma sin perder contexto de pagina.	Recomendado por audiencia internacional.
FUNC-03	Listado de proyectos con filtros por tipo: Software, CRO, Shopify, Analytics, UX.	Alta	El filtro actualiza cards sin recargar pagina; URLs compartibles si es posible.	MVP puede ser filtro local.
FUNC-04	Paginas individuales de case study generadas desde contenido estructurado.	MVP	Cada proyecto se renderiza con layout consistente y campos obligatorios.	MDX, CMS o JSON local.
FUNC-05	Formulario de contacto breve.	MVP	Campos: nombre, email, tipo de proyecto, mensaje; validacion inline; confirmacion clara.	Integrar con Resend, Formspree, HubSpot o similar.
FUNC-06	CTA para agendar llamada.	Alta	Link a Calendly/TidyCal o ruta de contacto; evento de tracking registrado.	Debe ser secundario si no hay disponibilidad fija.
FUNC-07	Descarga o visualizacion de CV/perfil.	Media	Link accesible a PDF o pagina about; evento de tracking registrado.	Opcional si el foco es consulting.
FUNC-08	Soporte de contenido CMS o data files.	Alta	Agregar un proyecto nuevo no requiere tocar componentes de layout.	Sanity/Contentful/MDX.
FUNC-09	Estados vacios, error y loading.	MVP	No existen pantallas rotas si falla contenido o formulario.	Particularmente importante en mobile.
FUNC-10	Modo reduced motion.	MVP	Animaciones decorativas se reducen o desactivan con prefers-reduced-motion.	Requisito de accesibilidad.

6. Requerimientos visuales y sistema de diseno
Direccion visual
Estilo principal: editorial suizo + estudio creativo + SaaS premium. Estilo secundario: bento grid/dashboards para expresar la dimension CRO y datos. El diseno debe ser sobrio, con alto contraste, mucho aire, composicion asimetrica controlada y detalles tipograficos precisos.
Paleta semantica propuesta
Token	Hex	Uso	Regla
background	#F7F4EE	Fondo principal crema calido	Debe transmitir craft y calidez.
foreground	#171717	Texto principal	Contraste alto sobre fondo claro.
muted	#5F5A52	Texto secundario	Usar solo para metadata y descripciones.
card	#FFFFFF	Superficies y cards	Bordes finos; sombras muy suaves.
border	#E7E0D5	Lineas, separadores, contenedores	Debe verse editorial, no pesado.
primary	#C9781E	CTA principal y acentos de conversion	Usar con moderacion.
secondary	#1F5FBF	Acento tecnico/software	Para tags tecnicos, links o data.
success/data	#0F766E	Metricas positivas, insights	No usar como unico indicador visual.
dark-section	#0F1115	Bloques de contraste	Usar en manifesto, CTA o footer.
destructive	#B42318	Errores de formulario	Siempre con texto explicativo.

Tipografia
Headings	Inter Tight, Satoshi, Neue Montreal o Aptos Display como fallback. Usar tracking negativo ligero en H1/H2.
Body	Inter, Geist, Manrope o Aptos. Line-height generoso para lectura editorial.
Data/Code	JetBrains Mono, IBM Plex Mono o Geist Mono. Usar solo para metricas, IDs, stacks y snippets.
H1 desktop	72-108 px segun layout; line-height 0.92-1.0; maximo 10-12 palabras por bloque.
H1 mobile	42-56 px; evitar cortes raros; mantener legibilidad.
Body	16-18 px; line-height 1.55-1.7.
Captions/metadata	12-13 px; uppercase con letter-spacing 0.04-0.08em.

Grid, espaciado y contenedores
•	Desktop: contenedor maximo 1440 px, padding lateral 48-72 px, grid de 12 columnas.
•	Tablet: 8 columnas, padding 32-40 px.
•	Mobile: 4 columnas, padding 20-24 px.
•	Secciones: 96-160 px de espaciado vertical en desktop; 64-96 px en mobile.
•	Cards: border-radius 18-24 px; border 1 px; shadow sutil maximo rgba(17,17,17,0.06).
•	Separadores: lineas finas, numeracion y metadata, no bloques pesados.
7. Componentes UI
ID	Requerimiento	Prioridad	Criterio de aceptacion	Notas
COMP-01	Header / Navigation	Logo textual, menu numerado, idioma, CTA. Sticky opcional con fondo translucido y blur ligero.	MVP	No debe tapar contenido ni perder contraste.
COMP-02	Preloader	Contador 00-100%, texto corto, animacion de salida.	Alta	Maximo 1.2 s salvo carga real; fallback sin JS.
COMP-03	Hero narrative block	H1 grande, copy corto, keywords y metric card.	MVP	Debe comunicar propuesta de valor sin depender de animacion.
COMP-04	Metric card	Tarjetas con KPI, delta, contexto y fuente.	MVP	Cada metrica debe tener contexto: periodo, proyecto o disclaimer.
COMP-05	Project card	Imagen, titulo, tipo, rol, stack, resultado y CTA.	MVP	Toda la card clicable con foco visible.
COMP-06	Archive filter	Tabs o chips por categoria.	Alta	Debe poder usarse con teclado y screen reader.
COMP-07	Service/capability card	Pilar, descripcion, entregables, stack relacionado.	MVP	Evitar logos sin explicacion.
COMP-08	Process timeline	Pasos numerados con resultado por fase.	MVP	Debe reforzar metodo CRO.
COMP-09	Case study media block	Imagen grande, before/after, anotaciones, mockups responsive.	Alta	Lazy-load, alt text descriptivo.
COMP-10	Contact form	Inputs, select, textarea, consent optional, success/error.	MVP	Validacion inline y mensajes claros.
COMP-11	Footer	Email, redes, disponibilidad, copyright, links secundarios.	MVP	Debe incluir CTA final y datos de contacto.

8. Animacion, microinteracciones y comportamiento
El movimiento debe sentirse editorial y artesanal, no como una demo de librerias. Priorizar transiciones de scroll, reveal tipografico, movimiento de imagenes y feedback de hover. El sitio de referencia usa una sensacion inmersiva con drag/cursor contextual y scroll narrativo; para tu portafolio, esto debe aplicarse sin sacrificar rendimiento ni accesibilidad.
ID	Requerimiento	Prioridad	Criterio de aceptacion	Notas
MOT-01	Page transition	Transicion suave entre paginas con fade/clip y duracion 350-600 ms.	Alta	No bloquear interaccion; reduced-motion usa fade minimo.
MOT-02	Scroll reveal	Titulos y bloques aparecen con translateY 16-32 px y opacity.	MVP	No animar parrafos largos linea por linea en mobile.
MOT-03	Keyword marquee	Lista de keywords tecnica/CRO con desplazamiento lento.	Alta	Pausar en hover; reducir/desactivar con prefers-reduced-motion.
MOT-04	Project drag carousel	Opcional para works destacados; drag horizontal con cursor contextual.	Media	Debe tener alternativa por botones o scroll nativo.
MOT-05	Card hover	Elevacion 2-4 px, borde/acento y cambio sutil de imagen.	MVP	No depender de hover para revelar info critica.
MOT-06	Metric count-up	Animacion de numeros solo al entrar en viewport.	Media	Mantener valor visible sin JS.
MOT-07	Cursor custom	Solo desktop, decorativo, desactivable.	Baja	Nunca debe sustituir puntero real ni afectar accesibilidad.
MOT-08	3D/WebGL accent	Opcional: objeto abstracto o grid de datos muy ligero.	Baja	No usar si afecta LCP, INP o mobile battery.

9. Contenido, copy y modelo de case studies
Principios de copy
•	Usar frases breves, concretas y con verbo activo.
•	Equilibrar creatividad con precision tecnica.
•	Evitar claims vacios: "innovador", "disruptivo", "apasionado" sin evidencia.
•	Traducir tecnologia a impacto: performance, conversion, claridad, confiabilidad, velocidad de iteracion.
•	Mostrar resultados aun si son anonimizados: rangos, porcentajes, mejoras cualitativas o cambios observados.
Modelo de datos para proyecto/case study
Campo	Tipo	Obligatorio	Descripcion
slug	string	Si	URL unica del caso.
title	string	Si	Nombre del proyecto.
subtitle	string	Si	Descripcion corta orientada a resultado.
year	number/string	Si	Ano o periodo.
type	enum	Si	Software, CRO, Shopify, Analytics, Landing, UX.
role	string[]	Si	Tu rol exacto.
stack	string[]	Si	Tecnologias y herramientas.
problem	rich text	Si	Problema de negocio o experiencia.
hypothesis	rich text	Alta	Hipotesis CRO o criterio de solucion.
solution	rich text	Si	Intervencion realizada.
metrics	object[]	Alta	KPI, baseline, result, confidence/disclaimer.
images	image[]	Si	Screenshots, mockups, diagrams, before/after.
testimonial	object	Media	Cliente, texto, cargo, permiso.
confidentiality	enum	Si	Publico, anonimo, redacted.

Plantilla narrativa de case study
1.	Contexto: que negocio, producto o funnel se estaba trabajando.
2.	Problema: que friccion existia y por que importaba.
3.	Diagnostico: que datos, observaciones o heuristicas sustentaron la decision.
4.	Intervencion: que se diseno, construyo, configuro o testeo.
5.	Resultado: que cambio, como se midio y que aprendizaje dejo.
6.	Stack y responsabilidades: que hiciste tu directamente.
10. CRO, analitica y medicion
El sitio debe funcionar como una prueba de tu especialidad CRO. No basta con verse bien: debe tener objetivos, eventos, medicion, hipotesis y conversion paths claros.
ID	Requerimiento	Prioridad	Criterio de aceptacion	Notas
CRO-01	Objetivo macro	Solicitud de contacto, llamada agendada o email iniciado.	MVP	Debe configurarse como conversion en GA4 u otra herramienta.
CRO-02	Eventos CTA	cta_click con propiedades: label, location, page, language.	MVP	Debe dispararse en hero, works, footer y contact.
CRO-03	Eventos de proyecto	project_card_click, project_view, case_study_scroll_depth.	Alta	Permite saber que casos generan interes.
CRO-04	Formulario	form_start, form_submit, form_error, form_success.	MVP	Capturar tipo de error sin guardar datos sensibles innecesarios.
CRO-05	Scroll depth	25%, 50%, 75%, 90% en paginas clave.	Media	Usar muestreo o eventos limitados si hay mucho trafico.
CRO-06	Outbound	email_click, calendly_click, linkedin_click, github_click.	MVP	Distinguir entre lead y exploracion.
CRO-07	Dashboard	Looker Studio o panel simple con leads, CTR, project views y conversion rate.	Media	Revisar mensualmente.
CRO-08	Testing roadmap	Testear hero message, CTA copy, orden de works y formulario.	Media	No sobretestear con poco trafico; usar experimentos cualitativos si hace falta.

11. Stack tecnico e implementacion
Stack recomendado
Framework	Next.js 15+ con App Router, React y TypeScript. Alternativa: Astro si se prioriza performance estatica.
Styling	Tailwind CSS + CSS variables para tokens. Alternativa: CSS Modules si se prefiere control granular.
Animacion	Framer Motion para transiciones y reveals; GSAP/Lenis solo si el scroll narrativo lo requiere.
Contenido	MDX para MVP; Sanity/Contentful si se quiere CMS visual y escalable.
Imagenes	next/image, formatos AVIF/WebP, placeholders blur, lazy loading.
Forms	Server Actions/API route + Resend, Formspree, Basin o HubSpot.
Analytics	GA4 + GTM + Vercel Analytics/PostHog opcional.
Deployment	Vercel por integracion con Next.js, preview deployments y edge.
3D opcional	Three.js/React Three Fiber solo como enhancement progresivo, nunca como dependencia para entender el contenido.

Arquitectura sugerida de carpetas
/app
  /(site)/page.tsx
  /manifesto/page.tsx
  /archive/page.tsx
  /archive/[slug]/page.tsx
/components
  Header.tsx, Hero.tsx, ProjectCard.tsx, MetricCard.tsx, ServiceCard.tsx, ContactForm.tsx
/content
  projects/*.mdx or projects.ts
/lib
  analytics.ts, seo.ts, utils.ts
/styles
  globals.css, tokens.css
Requerimientos tecnicos
ID	Requerimiento	Prioridad	Criterio de aceptacion	Notas
TECH-01	TypeScript estricto.	MVP	No errores de typecheck en build.	Aplicar types para proyectos y metricas.
TECH-02	Componentes reutilizables y data-driven.	MVP	Projects y services se renderizan desde data.	Evita duplicacion.
TECH-03	SEO dinamico por pagina.	MVP	title, description, OG image, canonical por pagina.	Case studies deben compartir bien.
TECH-04	Imagenes optimizadas.	MVP	AVIF/WebP, width/height definidos, lazy loading.	Hero image puede usar priority si aplica.
TECH-05	Form backend seguro.	MVP	Validacion server-side, honeypot o rate limit basico.	No exponer secrets.
TECH-06	Analytics desacoplado.	Alta	Funcion trackEvent centralizada y testeable.	Evita llamadas dispersas.
TECH-07	CI basico.	Media	Lint, typecheck y build en cada PR.	GitHub Actions o Vercel checks.

12. Performance, SEO y accesibilidad
ID	Requerimiento	Prioridad	Criterio de aceptacion	Notas
PERF-01	LCP menor a 2.5 s en mobile razonable.	MVP	Medido con Lighthouse/WebPageTest en pagina home.	Optimizar hero y fuentes.
PERF-02	CLS menor a 0.1.	MVP	No hay saltos visibles por imagenes, fuentes o embeds.	Definir dimensiones.
PERF-03	INP menor a 200 ms.	Alta	Interacciones principales responden rapido.	Evitar JS excesivo.
PERF-04	JS inicial controlado.	Alta	Animaciones y 3D se cargan de forma diferida.	Motion progressive enhancement.
SEO-01	Metadata completa.	MVP	Title, description, canonical, OG, Twitter cards.	Por idioma y pagina.
SEO-02	Structured data.	Media	Person, WebSite, CreativeWork/Project cuando aplique.	Validar con Rich Results.
SEO-03	Sitemap y robots.	MVP	Sitemap generado, rutas indexables correctas.	No indexar previews.
A11Y-01	WCAG 2.2 AA.	MVP	Contraste, labels, foco, teclado, alt text.	Validar con Axe + revision manual.
A11Y-02	Skip link.	MVP	Primer tab permite saltar al contenido.	La referencia incluye "Skip to content".
A11Y-03	Reduced motion.	MVP	Sin animaciones esenciales forzadas.	CSS + JS.
A11Y-04	Mobile usable.	MVP	Botones minimo 44 px, texto legible, menu accesible.	No hover-only.

13. Entregables, backlog y criterios de aceptacion
Entregables de diseno
•	Moodboard y direccion visual aprobada: colores, referencias, tipografia y principios.
•	Wireframes desktop/mobile de Home, Archive, Manifesto, Case Study y Contact.
•	UI kit en Figma: tokens, botones, cards, nav, forms, project cards, metric cards y grids.
•	Prototipo de interacciones clave: hero, works, page transition, filter, contact form.
•	Guia de contenido: plantilla de case study, tone of voice, ejemplos de copy y reglas de metricas.
Entregables de desarrollo
•	Repositorio con Next.js/React/TypeScript, componentes reutilizables y README de instalacion.
•	Integracion de contenido MDX/CMS para proyectos y servicios.
•	Formulario funcional con validacion, manejo de errores y proteccion anti-spam basica.
•	Tracking de eventos documentado y probado.
•	SEO tecnico completo: metadata, sitemap, robots, OG images.
•	QA responsive, accesibilidad, performance y cross-browser.
Backlog por fases
Fase	Objetivo	Incluye	Criterio de salida
Fase 0 - Discovery	Cerrar estrategia y contenido.	Audiencia, objetivos, sitemap, inventario de proyectos, metricas publicables.	Brief aprobado y contenido base definido.
Fase 1 - Visual system	Crear direccion visual.	Moodboard, tokens, tipografia, layout, componentes base.	Figma aprobado para Home y Case Study.
Fase 2 - MVP build	Publicar version funcional.	Home, Archive, Case Study, Contact, SEO, responsive, form.	Sitio deployado y sin bloqueadores QA.
Fase 3 - Motion polish	Agregar interacciones premium.	Page transitions, scroll reveals, carousel/drag, microinteracciones.	Motion fluido y reduced-motion correcto.
Fase 4 - CRO instrumentation	Medir y optimizar.	GA4/GTM, eventos, dashboard, test roadmap.	Eventos verificados y conversiones configuradas.

Definicion de terminado
•	El sitio comunica claramente la propuesta de valor en el primer viewport.
•	Existen al menos 3 case studies con estructura problema-solucion-impacto.
•	La experiencia es usable en 375 px, 768 px, 1024 px y 1440 px.
•	No hay errores de consola, rutas rotas ni imagenes sin dimensiones.
•	Lighthouse no baja de 90 en Performance, Accessibility, Best Practices y SEO en paginas principales, salvo justificacion documentada.
•	Todas las interacciones clave tienen estado hover, active, focus y reduced-motion.
•	Los eventos de conversion se registran correctamente en ambiente de produccion.
•	El contenido no copia textos, imagenes, naming ni identidad de Synapser Studio.
Apendice A. Copy base sugerido
Hero H1	I build conversion-focused software experiences.
Hero ES	Desarrollo experiencias digitales enfocadas en conversion.
Subtitulo	Combino ingenieria de software, UX, analitica y experimentacion CRO para convertir sitios y productos digitales en sistemas medibles de crecimiento.
CTA primario	Hablemos de tu funnel
CTA secundario	Ver case studies
Manifesto line	Every interface is a hypothesis. Every interaction is a signal. Every release should teach something.
Services title	Build. Optimize. Measure.
Final CTA	Tienes trafico, pero no la conversion que esperas? Convirtamos tu sitio en un sistema de aprendizaje.

Apendice B. Fuentes consultadas
Synapser Studio - Home: https://www.synapserstudio.com/
Synapser Studio - Manifesto: https://www.synapserstudio.com/manifesto
Synapser Studio - Archive / proyecto observado: https://www.synapserstudio.com/archive/albano-morgado
Nota: los requerimientos son una reinterpretacion para un portafolio propio; no deben usarse assets, textos o identidad visual de terceros sin permiso.

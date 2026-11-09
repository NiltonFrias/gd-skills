// Tradução da interface (Português → Español / English), feita no navegador: a página vem em português e, se a pessoa
// escolheu outro idioma, os textos são trocados aqui. Guarda o original de cada texto para poder voltar ao português.
// Nomes próprios (kits, Canva, Photoshop, nome do Clube) ficam como estão. Os prompts de IA continuam em português.
(function () {
  'use strict';

  // [português, español, english]
  var LISTA = [
    // Casca: menu, barra de cima, conta, idioma
    ['Início', 'Inicio', 'Home'], ['Cursos', 'Cursos', 'Courses'], ['Packs de Artes', 'Packs de Artes', 'Design Packs'], ['Packs', 'Packs', 'Packs'],
    ['Ferramentas', 'Herramientas', 'Tools'], ['IA', 'IA', 'AI'], ['Favoritos', 'Favoritos', 'Favorites'], ['Menu', 'Menú', 'Menu'],
    ['Ajuda', 'Ayuda', 'Help'], ['Idioma', 'Idioma', 'Language'], ['Modo claro/escuro', 'Modo claro/oscuro', 'Light/dark mode'],
    ['Encolher ou abrir o menu', 'Contraer o abrir el menú', 'Collapse or expand the menu'], ['Avisos', 'Avisos', 'Notifications'],
    ['Minha Conta', 'Mi cuenta', 'My account'], ['Minha conta', 'Mi cuenta', 'My account'], ['Meus Favoritos', 'Mis favoritos', 'My favorites'],
    ['Aulas Concluídas', 'Clases completadas', 'Completed lessons'], ['Encerrar Sessão', 'Cerrar sesión', 'Log out'], ['Conectado como', 'Conectado como', 'Signed in as'],
    ['Membro do Clube', 'Miembro del Club', 'Club member'], ['Atalhos', 'Atajos', 'Shortcuts'], ['Você está em', 'Estás en', 'You are here'],
    ['Criativos do Reino, início', 'Criativos do Reino, inicio', 'Criativos do Reino, home'], ['Clube Criativos do Reino, início', 'Club Criativos do Reino, inicio', 'Criativos do Reino Club, home'],
    ['Voltar', 'Volver', 'Back'], ['Ver mais', 'Ver más', 'See more'], ['Ver todos', 'Ver todos', 'See all'], ['Fechar', 'Cerrar', 'Close'],
    ['Em breve', 'Próximamente', 'Coming soon'], ['Não liberado', 'No disponible', 'Locked'], ['Atualização do mês', 'Novedad del mes', 'New this month'],
    ['Português', 'Português', 'Português'], ['Español', 'Español', 'Español'], ['English', 'English', 'English'],
    // Início e banners
    ['Destaques', 'Destacados', 'Highlights'], ['Destaque anterior', 'Destacado anterior', 'Previous highlight'], ['Próximo destaque', 'Siguiente destacado', 'Next highlight'],
    ['Seja um revendedor', 'Sé revendedor', 'Become a reseller'], ['Indique o Clube e', 'Recomienda el Club y', 'Refer the Club and'], ['ganhe com isso.', 'gana con ello.', 'earn from it.'],
    ['Receba uma comissão a cada amigo que entrar para o Clube Criativos do Reino.', 'Recibe una comisión por cada amigo que entre al Club Criativos do Reino.', 'Earn a commission for every friend who joins the Criativos do Reino Club.'],
    ['Quero ser revendedor', 'Quiero ser revendedor', 'I want to be a reseller'], ['Suporte humanizado', 'Soporte humano', 'Human support'],
    ['Ficou com dúvida?', '¿Tienes dudas?', 'Have a question?'], ['Fale com a gente.', 'Habla con nosotros.', 'Talk to us.'],
    ['Gente de verdade para te ajudar pelo WhatsApp.', 'Personas reales para ayudarte por WhatsApp.', 'Real people to help you on WhatsApp.'], ['Falar no WhatsApp', 'Hablar por WhatsApp', 'Chat on WhatsApp'],
    ['Bem-vindo', 'Bienvenido', 'Welcome'], ['ao Clube.', 'al Club.', 'to the Club.'], ['Cursos, artes e ferramentas para a mídia da sua igreja.', 'Cursos, artes y herramientas para el equipo de medios de tu iglesia.', 'Courses, designs and tools for your church media team.'],
    ['Cursos e Treinamentos', 'Cursos y Entrenamientos', 'Courses and Trainings'], ['Cursos e Treinamentos:', 'Cursos y Entrenamientos:', 'Courses and Trainings:'],
    ['Packs de Artes:', 'Packs de Artes:', 'Design Packs:'], ['Ferramentas:', 'Herramientas:', 'Tools:'], ['Inteligência Artificial', 'Inteligencia Artificial', 'Artificial Intelligence'],
    ['Inteligência Artificial:', 'Inteligencia Artificial:', 'Artificial Intelligence:'], ['Cursos:', 'Cursos:', 'Courses:'], ['Treinamentos:', 'Entrenamientos:', 'Trainings:'], ['Inteligência Artificial na Criação:', 'Inteligencia Artificial en la Creación:', 'AI for Creating:'], ['Crie com IA seu', 'Crea con IA tu', 'Create with AI your'], ['Carrossel', 'Carrusel', 'Carousel'], ['Vídeos com IA', 'Videos con IA', 'AI videos'], ['Crie no ChatGPT', 'Crea en ChatGPT', 'Create in ChatGPT'], ['Artes com IA', 'Artes con IA', 'AI designs'],
    // Cursos e aula
    ['Cartaz gospel no Canva', 'Cartel cristiano en Canva', 'Gospel poster in Canva'], ['Cartaz gospel no Photoshop', 'Cartel cristiano en Photoshop', 'Gospel poster in Photoshop'],
    ['Cartaz animado no CapCut', 'Cartel animado en CapCut', 'Animated poster in CapCut'], ['Renda Extra Designer Cristã', 'Ingreso Extra Diseñadora Cristiana', 'Extra Income Christian Designer'],
    ['Igreja com mais alcance', 'Iglesia con más alcance', 'Church with more reach'],
    ['Cartaz gospel', 'Cartel cristiano', 'Gospel poster'], ['Cartaz animado', 'Cartel animado', 'Animated poster'], ['Designer cristã', 'Diseñadora cristiana', 'Christian designer'],
    ['Renda extra', 'Ingreso extra', 'Extra income'], ['Igreja com mais', 'Iglesia con más', 'Church with more'], ['Alcance', 'Alcance', 'Reach'], ['Concluir aula', 'Completar clase', 'Complete lesson'], ['Concluir curso', 'Completar curso', 'Complete course'],
    ['Materiais', 'Materiales', 'Materials'], ['Criativos', 'Creativos', 'Kingdom'], ['do', 'del', ''], ['Reino', 'Reino', 'Creatives'], ['Seus dados', 'Tus datos', 'Your details'], ['Nome', 'Nombre', 'Name'], ['E-mail', 'Correo', 'Email'], ['Senha', 'Contraseña', 'Password'], ['Senha nova', 'Contraseña nueva', 'New password'], ['Senha atual', 'Contraseña actual', 'Current password'], ['Salvar', 'Guardar', 'Save'], ['Sair da conta', 'Cerrar sesión', 'Sign out'], ['Entrar no Clube', 'Entrar al Club', 'Sign in to the Club'], ['Use o e-mail da sua compra.', 'Usa el correo de tu compra.', 'Use the email from your purchase.'], ['Mostrar senha', 'Mostrar contraseña', 'Show password'], ['Esconder senha', 'Ocultar contraseña', 'Hide password'], ['Entrar', 'Entrar', 'Sign in'], ['Esqueci minha senha', 'Olvidé mi contraseña', 'Forgot my password'], ['Voltar para entrar', 'Volver a entrar', 'Back to sign in'], ['Receber no e-mail', 'Recibir por correo', 'Send me the email'],
    ['Digite o e-mail da sua conta. Vamos te mandar um link para voltar a senha para a senha padrão do Clube.', 'Escribe el correo de tu cuenta. Te enviaremos un enlace para volver tu contraseña a la contraseña estándar del Club.', 'Type your account email. We will send you a link to reset your password to the Club default password.'],
    ['Esse e-mail não parece certo.', 'Ese correo no parece correcto.', 'That email does not look right.'], ['E-mail ou senha incorretos.', 'Correo o contraseña incorrectos.', 'Wrong email or password.'],
    ['No momento não dá para recuperar pelo e-mail. Fale com o suporte no WhatsApp.', 'Por ahora no se puede recuperar por correo. Habla con soporte por WhatsApp.', 'Password recovery by email is not available right now. Contact support on WhatsApp.'],
    ['Esse link não vale mais. Peça outro em "Esqueci minha senha".', 'Este enlace ya no es válido. Pide otro en "Olvidé mi contraseña".', 'This link has expired. Ask for a new one in "Forgot my password".'],
    ['Se quiser, você pode trocar a sua senha em', 'Si quieres, puedes cambiar tu contraseña en', 'If you want, you can change your password in'],['Deixe em branco para manter', 'Déjalo en blanco para mantenerla', 'Leave blank to keep it'], ['Só para trocar o e-mail ou a senha', 'Solo para cambiar el correo o la contraseña', 'Only to change email or password'], ['Dados salvos.', 'Datos guardados.', 'Details saved.'], ['Dados e senha salvos.', 'Datos y contraseña guardados.', 'Details and password saved.'], ['As aulas deste curso chegam em breve.', 'Las clases de este curso llegan pronto.', 'The lessons of this course are coming soon.'], ['Dicas e usabilidade', 'Consejos y uso', 'Tips and how to use'], ['Arquivos do curso', 'Archivos del curso', 'Course files'], ['Grupo do WhatsApp', 'Grupo de WhatsApp', 'WhatsApp group'], ['Baixar o CapCut (Windows)', 'Descargar CapCut (Windows)', 'Download CapCut (Windows)'], ['Baixar o CapCut (Mac)', 'Descargar CapCut (Mac)', 'Download CapCut (Mac)'], ['Bônus', 'Bono', 'Bonus'], ['Aulas do curso', 'Clases del curso', 'Course lessons'], ['Assistir à aula', 'Ver la clase', 'Watch the lesson'],
    ['Favoritar a aula', 'Guardar la clase en favoritos', 'Save lesson to favorites'], ['Tocar ou pausar', 'Reproducir o pausar', 'Play or pause'], ['Posição do vídeo', 'Posición del video', 'Video position'],
    ['Som', 'Sonido', 'Sound'], ['Volume', 'Volumen', 'Volume'], ['Tela cheia', 'Pantalla completa', 'Full screen'],
    ['Começando do zero', 'Empezando desde cero', 'Starting from scratch'], ['Conhecendo o Canva', 'Conociendo Canva', 'Getting to know Canva'], ['Conhecendo o Photoshop', 'Conociendo Photoshop', 'Getting to know Photoshop'],
    ['Tamanhos certos para cada rede', 'Tamaños correctos para cada red', 'The right sizes for each network'], ['Organizando seus arquivos', 'Organizando tus archivos', 'Organizing your files'],
    ['Atalhos que economizam tempo', 'Atajos que ahorran tiempo', 'Time-saving shortcuts'], ['Fundamentos do cartaz', 'Fundamentos del cartel', 'Poster fundamentals'],
    ['Hierarquia do texto', 'Jerarquía del texto', 'Text hierarchy'], ['Fontes que combinam', 'Fuentes que combinan', 'Fonts that match'], ['Cores e contraste', 'Colores y contraste', 'Color and contrast'],
    ['Fotos que funcionam', 'Fotos que funcionan', 'Photos that work'], ['Versículo com a referência certa', 'Versículo con la referencia correcta', 'Verse with the right reference'],
    ['Criando seu primeiro cartaz', 'Creando tu primer cartel', 'Creating your first poster'], ['Escolhendo o tema', 'Eligiendo el tema', 'Choosing the theme'], ['Montando o fundo', 'Armando el fondo', 'Building the background'],
    ['Um título que chama atenção', 'Un título que llama la atención', 'A title that grabs attention'], ['Informações do culto', 'Información del culto', 'Service details'], ['Ajustes finais', 'Ajustes finales', 'Final touches'],
    ['Exportando para o Instagram', 'Exportando para Instagram', 'Exporting for Instagram'], ['Projetos práticos', 'Proyectos prácticos', 'Hands-on projects'], ['Culto de jovens', 'Culto de jóvenes', 'Youth service'],
    ['Aniversário do pastor', 'Cumpleaños del pastor', "Pastor's birthday"], ['Congresso', 'Congreso', 'Conference'],
    // Packs
    ['Cartazes Editáveis', 'Carteles Editables', 'Editable Posters'], ['Carrosséis pós-culto', 'Carruseles post-culto', 'Post-service carousels'], ['Carrosséis de Conteúdo', 'Carruseles de Contenido', 'Content carousels'], ['Ensino e reflexão no feed da igreja', 'Enseñanza y reflexión en el feed de la iglesia', 'Teaching and reflection for the church feed'], ['Identidade Visual', 'Identidad Visual', 'Visual Identity'],
    ['Projeção para Telão', 'Proyección para Pantalla', 'Big Screen Projection'], ['Todos', 'Todos', 'All'], ['Temas', 'Temas', 'Themes'], ['Categorias', 'Categorías', 'Categories'],
    ['Buscar pelo número', 'Buscar por número', 'Search by number'], ['Nenhuma arte com esse número.', 'Ningún arte con ese número.', 'No design with that number.'], ['Páginas', 'Páginas', 'Pages'],
    ['Página anterior', 'Página anterior', 'Previous page'], ['Próxima página', 'Página siguiente', 'Next page'], ['Baixar para Photoshop', 'Descargar para Photoshop', 'Download for Photoshop'],
    ['Abrir no Canva', 'Abrir en Canva', 'Open in Canva'], ['Favoritar', 'Favorito', 'Favorite'], ['Arte', 'Arte', 'Design'],
    ['No Canva, toque em "Usar modelo" para criar a sua cópia e trocar os textos e as fotos.', 'En Canva, toca "Usar plantilla" para crear tu copia y cambiar los textos y las fotos.', 'In Canva, tap "Use template" to make your copy and change the texts and photos.'],
    ['Este pack ainda não está liberado para você.', 'Este pack aún no está disponible para ti.', 'This pack is not unlocked for you yet.'], ['Veja as prévias e libere quando quiser.', 'Mira las vistas previas y desbloquéalo cuando quieras.', 'See the previews and unlock it whenever you want.'],
    ['Agendas e tour', 'Agendas y giras', 'Schedules and tours'], ['Aniversário', 'Aniversario', 'Anniversary'], ['Batismo', 'Bautismo', 'Baptism'], ['Redes sociais', 'Redes sociales', 'Social media'],
    ['Campanhas e outros temas', 'Campañas y otros temas', 'Campaigns and other themes'], ['Cantina', 'Cantina', 'Canteen'], ['Culto da Família', 'Culto de la Familia', 'Family service'],
    ['Culto de Ensinamento', 'Culto de Enseñanza', 'Teaching service'], ['Homens e Obreiros', 'Hombres y Obreros', 'Men and Workers'], ['Culto de Missões', 'Culto de Misiones', 'Missions service'],
    ['Culto de Mulheres', 'Culto de Mujeres', "Women's service"], ['Natal', 'Navidad', 'Christmas'], ['Culto de Oração', 'Culto de Oración', 'Prayer service'], ['Santa Ceia', 'Santa Cena', "Lord's Supper"],
    ['Vigília', 'Vigilia', 'Vigil'], ['Culto Infantil', 'Culto Infantil', "Children's service"], ['Culto Jovem', 'Culto Juvenil', 'Youth service'], ['Culto da Virada', 'Culto de Año Nuevo', "New Year's Eve service"],
    ['Datas comemorativas', 'Fechas especiales', 'Special dates'], ['Encontro de Casais', 'Encuentro de Parejas', "Couples' meeting"], ['Internacional', 'Internacional', 'International'],
    // Ferramentas
    ['Calendário da Igreja', 'Calendario de la Iglesia', 'Church Calendar'], ['Removedor de Fundo', 'Quitar Fondo', 'Background Remover'], ['Fatiador de Carrossel', 'Divisor de Carrusel', 'Carousel Splitter'],
    ['Avisar no celular', 'Avisar en el celular', 'Notify on my phone'], ['Uma semana antes e na véspera de cada data marcada', 'Una semana antes y la víspera de cada fecha marcada', 'One week before and the day before each date'],
    ['Próximas datas', 'Próximas fechas', 'Upcoming dates'], ['Mês anterior', 'Mes anterior', 'Previous month'], ['Próximo mês', 'Mes siguiente', 'Next month'], ['É hoje', 'Es hoy', 'Today'], ['Amanhã', 'Mañana', 'Tomorrow'],
    ['Dia da Bíblia', 'Día de la Biblia', 'Bible Day'], ['Dia da Reforma Protestante', 'Día de la Reforma Protestante', 'Reformation Day'], ['Dia das Crianças', 'Día del Niño', "Children's Day"],
    ['Dia de Ação de Graças', 'Día de Acción de Gracias', 'Thanksgiving Day'], ['Dia do Evangélico', 'Día del Evangélico', 'Evangelical Day'], ['Culto da virada', 'Culto de Año Nuevo', "New Year's Eve service"],
    ['Solte a foto aqui', 'Suelta la foto aquí', 'Drop the photo here'], ['PNG ou JPG · uma pessoa por foto funciona melhor', 'PNG o JPG · una persona por foto funciona mejor', 'PNG or JPG · one person per photo works best'],
    ['Escolher foto', 'Elegir foto', 'Choose photo'], ['Escolha a foto', 'Elige la foto', 'Choose the photo'], ['Com a pessoa bem iluminada e de frente.', 'Con la persona bien iluminada y de frente.', 'With the person well lit and facing the camera.'],
    ['A IA tira o fundo', 'La IA quita el fondo', 'The AI removes the background'], ['Leva alguns segundos, direto no aparelho.', 'Tarda unos segundos, en tu propio dispositivo.', 'Takes a few seconds, right on your device.'],
    ['Baixe o PNG', 'Descarga el PNG', 'Download the PNG'], ['Pronto para usar no Canva ou no Photoshop.', 'Listo para usar en Canva o en Photoshop.', 'Ready to use in Canva or Photoshop.'],
    ['A imagem não sai do seu aparelho.', 'La imagen no sale de tu dispositivo.', 'The image never leaves your device.'], ['Removendo o fundo…', 'Quitando el fondo…', 'Removing the background…'],
    ['Na primeira vez o removedor é baixado (cerca de 13 MB) e fica guardado no aparelho.', 'La primera vez se descarga el removedor (unos 13 MB) y queda guardado en el dispositivo.', 'The first time, the remover is downloaded (about 13 MB) and stays saved on your device.'],
    ['Arraste para comparar antes e depois', 'Arrastra para comparar antes y después', 'Drag to compare before and after'], ['Antes', 'Antes', 'Before'], ['Sem fundo', 'Sin fondo', 'No background'],
    ['Foto original', 'Foto original', 'Original photo'], ['Foto sem fundo', 'Foto sin fondo', 'Photo without background'], ['Baixar PNG', 'Descargar PNG', 'Download PNG'], ['Compartilhar', 'Compartir', 'Share'],
    ['Outra foto', 'Otra foto', 'Another photo'], ['Outra imagem', 'Otra imagen', 'Another image'], ['Solte a arte do carrossel aqui', 'Suelta el arte del carrusel aquí', 'Drop the carousel design here'],
    ['A imagem comprida, com as dobras lado a lado', 'La imagen larga, con las partes una al lado de la otra', 'The long image, with the slides side by side'], ['Escolher imagem', 'Elegir imagen', 'Choose image'],
    ['Baixe a arte comprida', 'Descarga el arte largo', 'Download the long design'], ['No Canva, baixe o carrossel inteiro como uma imagem só.', 'En Canva, descarga el carrusel entero como una sola imagen.', 'In Canva, download the whole carousel as a single image.'],
    ['Solte aqui', 'Suéltala aquí', 'Drop it here'], ['O fatiador encontra as dobras sozinho.', 'El divisor encuentra las partes solo.', 'The splitter finds the slides on its own.'], ['Baixe os posts', 'Descarga los posts', 'Download the posts'],
    ['Um por um ou todos num ZIP, já na ordem.', 'Uno por uno o todos en un ZIP, ya en orden.', 'One by one or all in a ZIP, already in order.'], ['Dobras', 'Partes', 'Slides'], ['Quantidade de dobras', 'Cantidad de partes', 'Number of slides'],
    ['Baixar todas (ZIP)', 'Descargar todas (ZIP)', 'Download all (ZIP)'], ['Posts do carrossel', 'Posts del carrusel', 'Carousel posts'],
    ['Escolha uma imagem em PNG ou JPG.', 'Elige una imagen en PNG o JPG.', 'Choose a PNG or JPG image.'], ['Não deu para abrir essa imagem. Use PNG ou JPG.', 'No se pudo abrir esa imagen. Usa PNG o JPG.', "Couldn't open that image. Use PNG or JPG."],
    ['Não deu para remover o fundo agora. Confira a internet e tente de novo.', 'No se pudo quitar el fondo ahora. Revisa tu internet e inténtalo de nuevo.', "Couldn't remove the background right now. Check your internet and try again."],
    ['Essa imagem está em pé. O fatiador é para a arte comprida, com as dobras lado a lado.', 'Esta imagen es vertical. El divisor es para el arte largo, con las partes una al lado de la otra.', 'This image is vertical. The splitter is for the long design, with the slides side by side.'],
    // IA
    ['Fotos com IA', 'Fotos con IA', 'AI Photos'], ['Títulos 3D com IA', 'Títulos 3D con IA', 'AI 3D Titles'], ['Fundos com IA', 'Fondos con IA', 'AI Backgrounds'],
    ['Homem', 'Hombre', 'Man'], ['Mulher', 'Mujer', 'Woman'], ['Copiar prompt', 'Copiar prompt', 'Copy prompt'], ['Copiado!', '¡Copiado!', 'Copied!'],
    ['Não deu para copiar. Tente de novo.', 'No se pudo copiar. Inténtalo de nuevo.', "Couldn't copy. Try again."], ['Os primeiros modelos chegam em breve.', 'Los primeros modelos llegan pronto.', 'The first templates are coming soon.'],
    ['Cole no ChatGPT junto com a sua foto. A foto sai em PNG sem fundo.', 'Pégalo en ChatGPT junto con tu foto. La foto sale en PNG sin fondo.', 'Paste it into ChatGPT along with your photo. The photo comes out as a PNG with no background.'],
    ['Cole no ChatGPT e troque as palavras do topo. O título sai em PNG sem fundo.', 'Pégalo en ChatGPT y cambia las palabras de arriba. El título sale en PNG sin fondo.', 'Paste it into ChatGPT and change the words at the top. The title comes out as a PNG with no background.'],
    ['Cole no ChatGPT ou no Gemini e troque o tema, a cor e as cenas do topo.', 'Pégalo en ChatGPT o Gemini y cambia el tema, el color y las escenas de arriba.', 'Paste it into ChatGPT or Gemini and change the theme, color and scenes at the top.'],
    // nomes dos modelos de IA
    ['Terno cinza, sorrindo', 'Traje gris, sonriendo', 'Gray suit, smiling'], ['Ministrando com microfone', 'Ministrando con micrófono', 'Ministering with a mic'], ['Microfone, olhar ao longe', 'Micrófono, mirada a lo lejos', 'Mic, looking away'],
    ['Mão no rosto, elegante', 'Mano en el rostro, elegante', 'Hand on face, elegant'], ['Camisa clara, explicando', 'Camisa clara, explicando', 'Light shirt, explaining'], ['Terno, mãos juntas', 'Traje, manos juntas', 'Suit, hands together'],
    ['Cantando de olhos fechados', 'Cantando con los ojos cerrados', 'Singing with eyes closed'], ['Sorriso, braço cruzado', 'Sonrisa, brazo cruzado', 'Smile, arm crossed'], ['Blazer rosa', 'Blazer rosa', 'Pink blazer'],
    ['Pregando com a mão aberta', 'Predicando con la mano abierta', 'Preaching with an open hand'], ['Blazer bege', 'Blazer beige', 'Beige blazer'], ['Toda de branco', 'Toda de blanco', 'All in white'],
    ['Apontando para a igreja', 'Señalando a la iglesia', 'Pointing to the church'], ['Braços cruzados', 'Brazos cruzados', 'Arms crossed'], ['Pregando com fervor', 'Predicando con fervor', 'Preaching with fervor'],
    ['Bíblia na mão', 'Biblia en la mano', 'Bible in hand'], ['Bíblia e sorriso', 'Biblia y sonrisa', 'Bible and smile'], ['Gargalhada no palco', 'Risa en el escenario', 'Laughing on stage'], ['Dedo para o céu', 'Dedo al cielo', 'Finger to the sky'],
    ['Saia pink, pregando', 'Falda rosa, predicando', 'Pink skirt, preaching'], ['Terno azul, firme', 'Traje azul, firme', 'Blue suit, firm'], ['Santa Ceia', 'Santa Cena', "Lord's Supper"],
    ['Prata e ouro', 'Plata y oro', 'Silver and gold'], ['Cursiva e verde', 'Cursiva y verde', 'Script and green'], ['Cursiva e ouro', 'Cursiva y oro', 'Script and gold'], ['Três andares em cobre', 'Tres niveles en cobre', 'Three tiers in copper'],
    ['Com flores roxas', 'Con flores moradas', 'With purple flowers'], ['Com chama de fogo', 'Con llama de fuego', 'With a flame'], ['Cromo e cobre', 'Cromo y cobre', 'Chrome and copper'], ['Microfone na letra', 'Micrófono en la letra', 'Mic in the letter'],
    ['Cursiva alta em cobre', 'Cursiva alta en cobre', 'Tall copper script'], ['Água e respingos', 'Agua y salpicaduras', 'Water and splashes'], ['Ano em ouro', 'Año en oro', 'Year in gold'], ['Rosa com inicial grande', 'Rosa con inicial grande', 'Pink with big initial'],
    ['Aniversário em azul', 'Aniversario en azul', 'Anniversary in blue'], ['Asas de fogo', 'Alas de fuego', 'Wings of fire'], ['Pérola na concha', 'Perla en la concha', 'Pearl in the shell'], ['Escudo e espadas', 'Escudo y espadas', 'Shield and swords'],
    ['Serifa gigante turquesa', 'Serifa gigante turquesa', 'Giant turquoise serif'], ['Redonda vermelha e ouro', 'Redonda roja y oro', 'Round red and gold'], ['Chama no lugar do O', 'Llama en lugar de la O', 'Flame in place of the O'],
    ['Sobre a Bíblia aberta', 'Sobre la Biblia abierta', 'On the open Bible'], ['Degradê de fogo', 'Degradado de fuego', 'Fire gradient'], ['Coroa de louros', 'Corona de laureles', 'Laurel wreath'], ['Sigla com luz dourada', 'Sigla con luz dorada', 'Acronym with golden light'],
    ['Bloco azul com cursiva', 'Bloque azul con cursiva', 'Blue block with script'], ['Martelo de juiz', 'Mazo de juez', "Judge's gavel"], ['Roxo condensado', 'Morado condensado', 'Condensed purple'], ['Vermelho cromado', 'Rojo cromado', 'Chrome red'],
    ['Chave de ouro', 'Llave de oro', 'Golden key'], ['Globo e avião', 'Globo y avión', 'Globe and plane'], ['Xícara de café', 'Taza de café', 'Coffee cup'],
    ['Duas cenas numa cor só', 'Dos escenas en un solo color', 'Two scenes in one color'], ['Adoração com fogo', 'Adoración con fuego', 'Worship with fire'], ['Redemoinho de adoração', 'Remolino de adoración', 'Worship swirl'],
    ['Colunas e retícula', 'Columnas y trama', 'Columns and halftone'], ['Névoa no centro', 'Niebla en el centro', 'Mist in the center'], ['Claro e suave', 'Claro y suave', 'Light and soft'], ['Arco de luz', 'Arco de luz', 'Arc of light'],
    ['Neon com fones', 'Neón con auriculares', 'Neon with headphones'], ['Catedral iluminada', 'Catedral iluminada', 'Lit cathedral'], ['Esfera sobre a multidão', 'Esfera sobre la multitud', 'Sphere over the crowd'], ['Círculo de luz', 'Círculo de luz', 'Circle of light'],
    ['Arcos em rosa', 'Arcos en rosa', 'Pink arches'], ['Palco com LED', 'Escenario con LED', 'LED stage'], ['Luz em movimento', 'Luz en movimiento', 'Light in motion'], ['Fagulhas de fogo', 'Chispas de fuego', 'Fire sparks'],
    ['Escadaria do altar', 'Escalera del altar', 'Altar staircase'], ['Arena no círculo', 'Arena en el círculo', 'Arena in the circle'], ['Cacos de luz', 'Destellos de luz', 'Light shards'], ['Noite estrelada', 'Noche estrellada', 'Starry night'],
    ['Rastros de neon', 'Rastros de neón', 'Neon trails'], ['Pombas e fogo', 'Palomas y fuego', 'Doves and fire'], ['Redemoinho de fogo', 'Remolino de fuego', 'Fire swirl'], ['Palavra no fundo', 'Palabra de fondo', 'Word in the background'],
    ['Explosão no palco', 'Explosión en el escenario', 'Stage burst'], ['Corredor gótico', 'Pasillo gótico', 'Gothic hallway'], ['Colagem de adoração', 'Collage de adoración', 'Worship collage'], ['Correntes quebradas', 'Cadenas rotas', 'Broken chains'],
    ['Cidade em movimento', 'Ciudad en movimiento', 'City in motion'], ['Eclipse', 'Eclipse', 'Eclipse'], ['Cortinas', 'Cortinas', 'Curtains'], ['Cúpula de luz', 'Cúpula de luz', 'Dome of light'],
    // Cursos trazidos da área antiga
    ['Comece por aqui', 'Empieza aquí', 'Start here'], ['O que você quer aprender?', '¿Qué quieres aprender?', 'What do you want to learn?'], ['Pesquisar nas aulas', 'Buscar en las clases', 'Search the lessons'],
    ['Nada encontrado. Tente outra palavra.', 'Nada encontrado. Prueba otra palabra.', 'Nothing found. Try another word.'], ['Aula', 'Clase', 'Lesson'], ['Novo por aqui? Comece aqui', '¿Nuevo aquí? Empieza aquí', 'New here? Start here'], ['Primeiros passos', 'Primeros pasos', 'First steps'],
    ['Liberado para todos os membros: aprenda a usar o app e a editar as artes antes de começar.', 'Disponible para todos los miembros: aprende a usar la app y a editar los artes antes de empezar.', 'Open to all members: learn how to use the app and edit the designs before you start.'],
    ['Como editar os cartazes', 'Cómo editar los carteles', 'How to edit the posters'], ['Como editar os carrosséis', 'Cómo editar los carruseles', 'How to edit the carousels'],
    ['Boas-vindas ao Clube', 'Bienvenida al Club', 'Welcome to the Club'], ['Como usar o app', 'Cómo usar la app', 'How to use the app'], ['Instalar o app no celular', 'Instalar la app en el celular', 'Install the app on your phone'],
    ['Onde ficam as artes, os cursos e as ferramentas', 'Dónde están los artes, los cursos y las herramientas', 'Where to find the designs, courses and tools'],
    ['Vídeo em breve', 'Video próximamente', 'Video coming soon'], ['Esta aula ainda vai ser gravada.', 'Esta clase aún será grabada.', 'This lesson is still being recorded.'],
    ['Aulas de edição', 'Clases de edición', 'Editing lessons'], ['Aulas de edição:', 'Clases de edición:', 'Editing lessons:'], ['Indique', 'Recomienda', 'Refer'], ['e ganhe', 'y gana', 'and earn'],
    ['Como editar', 'Cómo editar', 'How to edit'], ['Cartazes', 'Carteles', 'Posters'], ['Carrosséis', 'Carruseles', 'Carousels'],
    ['Esta aula é um material', 'Esta clase es un material', 'This lesson is a resource'], ['Abra no botão Materiais, embaixo.', 'Ábrelo en el botón Materiales, abajo.', 'Open it with the Materials button below.'],
    ['Vídeo ainda não encontrado', 'Video aún no encontrado', 'Video not found yet'], ['Esta aula ainda precisa do vídeo.', 'Esta clase aún necesita el video.', 'This lesson still needs its video.'],
    // Avisos
    ['Instalar o app', 'Instalar la app', 'Install the app'], ['Abra o Clube direto da tela inicial do celular ou do computador, como um aplicativo.', 'Abre el Club directo desde la pantalla de inicio del celular o de la computadora, como una app.', 'Open the Club straight from your phone or computer home screen, like an app.'],
    ['Instalar', 'Instalar', 'Install'], ['No iPhone: toque em Compartilhar e depois em "Adicionar à Tela de Início".', 'En iPhone: toca Compartir y luego "Agregar a pantalla de inicio".', 'On iPhone: tap Share, then "Add to Home Screen".'],
    ['O app já está instalado.', 'La app ya está instalada.', 'The app is already installed.'], ['No menu do navegador, escolha "Instalar app" ou "Adicionar à tela inicial".', 'En el menú del navegador, elige "Instalar app" o "Agregar a pantalla de inicio".', 'In the browser menu, choose "Install app" or "Add to Home Screen".'],
    ['Avisos no celular', 'Avisos en el celular', 'Phone notifications'], ['Receba um aviso quando chegar arte nova, aula nova e as datas do calendário.', 'Recibe un aviso cuando llegue arte nuevo, clase nueva y las fechas del calendario.', 'Get notified about new designs, new lessons and calendar dates.'],
    ['Ativar avisos', 'Activar avisos', 'Turn on notifications'], ['Avisos ativados neste aparelho.', 'Avisos activados en este dispositivo.', 'Notifications are on for this device.'],
    ['Os avisos estão bloqueados. Libere nas configurações do navegador.', 'Los avisos están bloqueados. Actívalos en la configuración del navegador.', 'Notifications are blocked. Allow them in your browser settings.'],
    ['Últimos avisos', 'Últimos avisos', 'Latest notifications'], ['Últimos avisos:', 'Últimos avisos:', 'Latest notifications:'],
    ['Chegou a atualização do mês: 12 cartazes novos.', 'Llegó la novedad del mes: 12 carteles nuevos.', "This month's update is here: 12 new posters."],
    ['Novo: Fotos, Títulos 3D e Fundos com IA, com prompts prontos para copiar.', 'Nuevo: Fotos, Títulos 3D y Fondos con IA, con prompts listos para copiar.', 'New: AI Photos, 3D Titles and Backgrounds, with ready-to-copy prompts.'],
    // Favoritos e telas em construção
    ['Nenhum favorito ainda. Toque no coração de uma arte para guardá-la aqui.', 'Aún no hay favoritos. Toca el corazón de un arte para guardarlo aquí.', 'No favorites yet. Tap the heart on a design to save it here.'],
    ['Perfil da igreja', 'Perfil de la iglesia', 'Church profile'], ['App e notificações', 'App y notificaciones', 'App and notifications'], ['Não encontrado', 'No encontrado', 'Not found'],
    ['Esta página não existe.', 'Esta página no existe.', 'This page does not exist.'], ['Esta tela entra nas próximas fases.', 'Esta pantalla llega en las próximas fases.', 'This screen is coming in the next phases.'],
    ['Nome da igreja, pastor, cores e as datas da igreja (Santa Ceia, aniversário, congressos). Chega na Fase 2.', 'Nombre de la iglesia, pastor, colores y las fechas de la iglesia (Santa Cena, aniversario, congresos). Llega en la Fase 2.', "Church name, pastor, colors and the church's dates (Lord's Supper, anniversary, conferences). Coming in Phase 2."],
    ['Instalar o app e escolher os avisos. Chega na Fase 6.', 'Instalar la app y elegir los avisos. Llega en la Fase 6.', 'Install the app and choose notifications. Coming in Phase 6.'],
  ];
  var MESES = { pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
  var SEMANA = { pt: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'], es: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'], en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
  var COL = { es: 1, en: 2 };
  var mapa = {};
  LISTA.forEach(function (l) { mapa[l[0]] = l; });

  // Textos com número ou nome dentro: [padrão, español, english] (as funções recebem a "lista" de partes e o tradutor)
  var REGRAS = [
    [/^(\d+) artes?$/, function (m) { return m[1] + ' artes'; }, function (m) { return m[1] + (m[1] === '1' ? ' design' : ' designs'); }],
    [/^(\d+) carrosséis$/, function (m) { return m[1] + ' carruseles'; }, function (m) { return m[1] + ' carousels'; }],
    [/^(\d+) kits?$/, function (m) { return m[0]; }, function (m) { return m[0]; }],
    [/^(\d+) telas$/, function (m) { return m[1] + ' pantallas'; }, function (m) { return m[1] + ' screens'; }],
    [/^(\d+) modelos?$/, function (m) { return m[1] + (m[1] === '1' ? ' modelo' : ' modelos'); }, function (m) { return m[1] + (m[1] === '1' ? ' template' : ' templates'); }],
    [/^(\d+) aulas$/, function (m) { return m[1] + ' clases'; }, function (m) { return m[1] + ' lessons'; }],
    [/^(\d+) posts?$/, function (m) { return m[0]; }, function (m) { return m[0]; }],
    [/^(\d+)% assistido$/, function (m) { return m[1] + '% visto'; }, function (m) { return m[1] + '% watched'; }],
    [/^(\d+) de (\d+) aulas · (\d+)%$/, function (m) { return m[1] + ' de ' + m[2] + ' clases · ' + m[3] + '%'; }, function (m) { return m[1] + ' of ' + m[2] + ' lessons · ' + m[3] + '%'; }],
    [/^Em (\d+) dias( · da sua igreja)?$/, function (m) { return 'En ' + m[1] + ' días' + (m[2] ? ' · de tu iglesia' : ''); }, function (m) { return 'In ' + m[1] + ' days' + (m[2] ? ' · your church' : ''); }],
    [/^(É hoje|Amanhã) · da sua igreja$/, function (m, t) { return t(m[1]) + ' · de tu iglesia'; }, function (m, t) { return t(m[1]) + ' · your church'; }],
    [/^Avisar sobre (.+)$/, function (m, t) { return 'Avisar sobre ' + t(m[1]); }, function (m, t) { return 'Notify about ' + t(m[1]); }],
    [/^Cartaz (\d+)$/, function (m) { return 'Cartel ' + m[1]; }, function (m) { return 'Poster ' + m[1]; }],
    [/^Carrossel (\d+)$/, function (m) { return 'Carrusel ' + m[1]; }, function (m) { return 'Carousel ' + m[1]; }],
    [/^Telão (\d+)$/, function (m) { return 'Pantalla ' + m[1]; }, function (m) { return 'Screen ' + m[1]; }],
    [/^Slides do (.+?)(, arraste para o lado)?$/, function (m, t) { return 'Diapositivas del ' + t(m[1]) + (m[2] ? ', arrastra hacia el lado' : ''); }, function (m, t) { return t(m[1]) + ' slides' + (m[2] ? ', drag sideways' : ''); }],
    [/^Ver o kit (.+)$/, function (m) { return 'Ver el kit ' + m[1]; }, function (m) { return 'See the ' + m[1] + ' kit'; }],
    [/^Peças do kit (.+)$/, function (m) { return 'Piezas del kit ' + m[1]; }, function (m) { return m[1] + ' kit pieces'; }],
    [/^Ver a tela (.+)$/, function (m, t) { return 'Ver la ' + t(m[1]).toLowerCase(); }, function (m, t) { return 'See ' + t(m[1]); }],
    [/^Destaque (\d+)$/, function (m) { return 'Destacado ' + m[1]; }, function (m) { return 'Highlight ' + m[1]; }],
    [/^(\d+)\. (.+)$/, function (m, t) { return m[1] + '. ' + t(m[2]); }, function (m, t) { return m[1] + '. ' + t(m[2]); }],
    [/^(\d+) de (janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)$/, function (m) { return m[1] + ' de ' + MESES.es[MESES.pt.indexOf(m[2])]; }, function (m) { return MESES.en[MESES.pt.indexOf(m[2])] + ' ' + m[1]; }],
    [/^Idioma: (.+)$/, function (m) { return 'Idioma: ' + m[1]; }, function (m) { return 'Language: ' + m[1]; }],
    [/^Preparando o removedor… (\d+)%$/, function (m) { return 'Preparando el removedor… ' + m[1] + '%'; }, function (m) { return 'Getting the remover ready… ' + m[1] + '%'; }],
    [/^Prompt copiado\. (.+)$/, function (m, t) { return 'Prompt copiado. ' + t(m[1]); }, function (m, t) { return 'Prompt copied. ' + t(m[1]); }],
    [/^Imagem de (\d+) × (\d+) px$/, function (m) { return 'Imagen de ' + m[1] + ' × ' + m[2] + ' px'; }, function (m) { return m[1] + ' × ' + m[2] + ' px image'; }],
    [/^Baixar o post (\d+)$/, function (m) { return 'Descargar el post ' + m[1]; }, function (m) { return 'Download post ' + m[1]; }],
  ];

  var idioma = 'pt';
  function traduzir(texto) {
    if (idioma === 'pt' || !texto) return texto;
    var limpo = texto.replace(/\s+/g, ' ').trim(), c = COL[idioma];
    if (mapa[limpo]) return mapa[limpo][c];
    var i = MESES.pt.indexOf(limpo.split(' ')[0]);
    if (i >= 0 && /^\S+ \d{4}$/.test(limpo)) return MESES[idioma][i] + ' ' + limpo.split(' ')[1];
    var d = SEMANA.pt.indexOf(limpo);
    if (d >= 0) return SEMANA[idioma][d];
    var ab = MESES.pt.map(function (x) { return x.slice(0, 3); }).indexOf(limpo);   // "out", "nov"… do calendário
    if (ab >= 0) return MESES[idioma][ab].slice(0, 3);
    for (var r = 0; r < REGRAS.length; r++) {
      var m = REGRAS[r][0].exec(limpo);
      if (m) return REGRAS[r][c](m, traduzir);
    }
    return texto;
  }

  // Cada texto e atributo guarda o original em português, para trocar de idioma quantas vezes quiser
  var ATRIBUTOS = ['placeholder', 'aria-label', 'title', 'alt', 'data-dica'];
  var originais = new WeakMap(), trocando = false;
  function noTexto(n) {
    var orig = originais.get(n);
    if (orig === undefined || (n.nodeValue !== orig.ultimo)) { orig = { pt: n.nodeValue }; originais.set(n, orig); }
    var novo = idioma === 'pt' ? orig.pt : orig.pt.replace(/\S[\s\S]*\S|\S/, function (t) { return traduzir(t); });
    orig.ultimo = novo;
    if (n.nodeValue !== novo) n.nodeValue = novo;
  }
  function noElemento(el) {
    ATRIBUTOS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var chave = 'pt-' + a, orig = el.getAttribute('data-' + chave);
      if (orig === null || el.getAttribute(a) !== el.getAttribute('data-ult-' + a)) { orig = el.getAttribute(a); el.setAttribute('data-' + chave, orig); }
      var novo = traduzir(orig); el.setAttribute('data-ult-' + a, novo); if (el.getAttribute(a) !== novo) el.setAttribute(a, novo);
    });
  }
  function percorrer(raiz) {
    trocando = true;
    if (raiz.nodeType === 3) { if (!raiz.parentElement || !raiz.parentElement.closest('script,style')) noTexto(raiz); trocando = false; return; }
    var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT), n = raiz;
    do {
      if (n.nodeType === 1) { if (/^(SCRIPT|STYLE|svg)$/i.test(n.nodeName)) continue; noElemento(n); }
      // texto que ficou vazio numa tradução (o "do" do logo em inglês) também volta ao trocar de novo
      else if ((/[A-Za-zÀ-ú]/.test(n.nodeValue) || originais.has(n)) && !n.parentElement.closest('script,style,svg')) noTexto(n);
    } while ((n = w.nextNode()));
    trocando = false;
  }
  function aplicar(v) {
    idioma = v === 'es' || v === 'en' ? v : 'pt';
    document.documentElement.lang = idioma === 'pt' ? 'pt-BR' : idioma;
    percorrer(document.body);
    if (!document.__tituloPt) document.__tituloPt = document.title;
    document.title = document.__tituloPt.split(' · ').map(traduzir).join(' · ');
    document.dispatchEvent(new Event('cdr:idioma'));
  }
  // O que a página troca depois (lista do pack, "Copiado!", avisos) também é traduzido
  new MutationObserver(function (lista) {
    if (trocando || idioma === 'pt') return;
    lista.forEach(function (m) {
      if (m.type === 'characterData') percorrer(m.target);
      else m.addedNodes.forEach(function (n) { if (n.nodeType === 1 || n.nodeType === 3) percorrer(n); });
    });
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  window.CDRIdioma = { aplicar: aplicar, traduzir: traduzir };
  var salvo = 'pt';
  try { salvo = localStorage.getItem('cdr:idioma') || 'pt'; } catch (e) {}
  if (salvo !== 'pt') aplicar(salvo);
})();

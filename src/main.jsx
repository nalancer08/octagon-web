import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Braces, Check, CircleDot, Database, Lock, Search, Sparkles, SquareTerminal, Table2, Users, Waypoints } from 'lucide-react';
import '@fontsource-variable/manrope';
import '@fontsource/dm-mono/latin-400.css';
import './style.css';

const beta = 'https://157.245.172.222/beta';
const modes = [
  {
    id: 'sql', label: 'SQL', Icon: Table2, engine: 'PostgreSQL', branch: 'Tablas', active: 'orders',
    entries: ['customers', 'orders', 'products'],
    query: ['SELECT', ' id, status, total ', 'FROM', ' orders ', 'ORDER BY', ' total DESC;'],
    cols: ['id', 'status', 'total'],
    rows: [['1042', 'completed', '$8,120.00'], ['1068', 'processing', '$5,785.50'], ['1031', 'completed', '$3,640.00']],
  },
  {
    id: 'mongo', label: 'MongoDB', Icon: Braces, engine: 'MongoDB', branch: 'Colecciones', active: 'events',
    entries: ['events', 'sessions', 'users'],
    query: ['db.events.find', '({ kind: ', '"purchase"', ' }).', 'limit', '(3)'],
    cols: ['_id', 'kind', 'source'],
    rows: [['evt_83f1', 'purchase', 'desktop'], ['evt_9a07', 'purchase', 'mobile'], ['evt_b662', 'purchase', 'web']],
  },
  {
    id: 'redis', label: 'Redis / Valkey', Icon: SquareTerminal, engine: 'Valkey', branch: 'Claves', active: 'queue:jobs',
    entries: ['cache:catalog', 'queue:jobs', 'worker:health'],
    query: ['LRANGE', ' queue:jobs ', '0', ' ', '2', ''],
    cols: ['index', 'job', 'state'],
    rows: [['0', 'invoice:1042', 'queued'], ['1', 'invoice:1068', 'queued'], ['2', 'invoice:1031', 'queued']],
  },
];

function Brand() {
  return <a className="brand" href="#inicio" aria-label="Octagon, inicio"><img src={import.meta.env.BASE_URL + 'octagon.png'} alt="" width="35" height="35" /><span>Octagon</span></a>;
}

function OctagonWire() {
  const points = '150,33 300,33 406,139 406,289 300,395 150,395 44,289 44,139';
  return <svg className="wire" viewBox="0 0 450 428" fill="none" aria-hidden="true">
    <g stroke="currentColor"><polygon points={points}/><polygon points={points} transform="translate(29 28) scale(.87)" strokeDasharray="2 7"/><polygon points={points} transform="translate(62 60) scale(.72)" opacity=".55"/>
    <path d="M225 1v55m0 315v56M10 214h56m318 0h56M44 139l106-106m150 362 106-106" />
    </g><path className="wire-highlight" d="M44 139l106-106h150m0 362 106-106v-150" stroke="currentColor"/>
  </svg>;
}

function Workbench() {
  const [active, setActive] = useState(0);
  const mode = modes[active];
  const changeByKey = (event, index) => {
    const selected = event.key === 'ArrowRight' ? (index + 1) % modes.length
      : event.key === 'ArrowLeft' ? (index + modes.length - 1) % modes.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? modes.length - 1 : -1;
    if (selected < 0) return;
    event.preventDefault();
    setActive(selected);
    document.getElementById('tab-' + modes[selected].id)?.focus();
  };
  return <div className="stage">
    <OctagonWire />
    <div className="stage-index"><span>FIG. 01</span><span>EXPLORADOR INTERACTIVO</span></div>
    <div className="workbench">
      <div className="bench-head">
        <span className="traffic" aria-hidden="true"><i/><i/><i/></span>
        <span className="bench-title"><Search size={12} /> Studio Workspace</span>
        <span className="bench-live"><CircleDot size={11} /> Demo</span>
      </div>
      <div className="mode-tabs" role="tablist" aria-label="Motores en la demostración">
        {modes.map(({ id, label, Icon }, index) => <button key={id} id={'tab-' + id} role="tab" type="button" aria-selected={index === active} aria-controls="bench-result" tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => changeByKey(event, index)}><Icon size={13} aria-hidden="true"/>{label}</button>)}
      </div>
      <div className="bench-body" id="bench-result" role="tabpanel" aria-labelledby={'tab-' + mode.id} tabIndex="0">
        <aside className="bench-tree" aria-label="Objetos de ejemplo">
          <div className="bench-engine"><Database size={13}/> {mode.engine}</div>
          <span className="bench-branch">{mode.branch}</span>
          {mode.entries.map(label => <span key={label} className={label === mode.active ? 'bench-selected' : ''}><mode.Icon size={11} aria-hidden="true"/>{label}</span>)}
        </aside>
        <div className="bench-content">
          <div className="bench-editor"><small><i/> {mode.active}</small><code>{mode.query.map((part,index) => index % 2 === 0 ? <em key={index}>{part}</em> : <React.Fragment key={index}>{part}</React.Fragment>)}</code></div>
          <div className="bench-results">
            <table><caption className="sr-only">Resultados ficticios de {mode.active}</caption><thead><tr>{mode.cols.map(col => <th key={col} scope="col">{col}</th>)}</tr></thead>
              <tbody>{mode.rows.map(row => <tr key={row[0]}>{row.map((cell,index) => <td key={index}>{index === 1 ? <span className="cell-value">{cell}</span> : cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="bench-foot"><span><Check size={12} /> Ejemplo local</span><span>{mode.rows.length} resultados</span></div>
    </div>
    <div className="stage-index bottom"><span><i/> DATOS FICTICIOS</span><span>OCTAGON / DESKTOP</span></div>
  </div>;
}

function Header() {
  return <header className="masthead shell"><Brand /><nav aria-label="Navegación principal"><a className="nav-product" href="#producto">Producto</a><a href="#beta" className="nav-beta">Beta privada <ArrowUpRight size={15} aria-hidden="true"/></a></nav></header>;
}

function Hero() {
  return <section className="hero shell" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow"><i/> GESTOR DE BASES DE DATOS</p>
      <h1 id="hero-title">Tus datos.<br/><span>Tus reglas.</span></h1>
      <p className="hero-description">Explora, consulta y edita tus bases desde un solo lugar. Con un agente que te muestra de dónde sacó la respuesta.</p>
      <div className="hero-actions"><a className="button primary" href={beta}>Acceder a la beta <ArrowUpRight size={19} aria-hidden="true"/></a><a className="button plain" href="#producto">Ver el producto <ArrowDown size={16} aria-hidden="true"/></a></div>
      <p className="hero-platform">macOS <span>·</span> Apple Silicon <span>·</span> Por invitación</p>
    </div>
    <Workbench />
  </section>;
}

const features = [
  { Icon: Database, mark: '01', title: 'Varias bases, una mesa de trabajo.', text: 'Mantén abiertas tus conexiones, explora esquemas y cambia de tabla a colección sin perder el hilo.' },
  { Icon: Sparkles, mark: '02', title: 'Preguntas que dejan evidencia.', text: 'Pídele al agente que investigue y revisa el resultado y la consulta que lo respaldan. Las escrituras del agente requieren tu aprobación.' },
  { Icon: Users, mark: '03', title: 'Comparte el trabajo, no las claves.', text: 'Separa lo personal del equipo. Comparte perfiles y definiciones con tu organización. Cada persona usa sus propias credenciales.' },
];

function Product() {
  return <section className="product" id="producto" aria-labelledby="product-title"><div className="shell">
    <div className="product-heading"><p className="eyebrow"><Waypoints size={15} aria-hidden="true"/> EL ESPACIO DE TRABAJO</p><h2 id="product-title">Del esquema<br/>a la respuesta.</h2><p>Las bases siguen siendo el centro. El agente, las consultas y los espacios de equipo están ahí cuando los necesitas.</p></div>
    <div className="features">{features.map(({Icon,mark,title,text}) => <article key={mark} className="feature"><div className="feature-meta"><Icon size={23} strokeWidth={1.5} aria-hidden="true"/><span>{mark} / 03</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
  </div></section>;
}

function Beta() {
  return <section className="beta" id="beta" aria-labelledby="beta-title"><div className="shell beta-grid">
    <div className="beta-intro"><p className="eyebrow"><Lock size={14} aria-hidden="true"/> BETA PRIVADA</p><h2 id="beta-title">Octagon en tu Mac.</h2><p>La primera beta es para Mac con chip Apple Silicon. Si ya tienes un código, puedes descargarla y recibir las siguientes versiones dentro de Octagon.</p><a className="button primary" href={beta}>Abrir portal de descarga <ArrowUpRight size={18} aria-hidden="true"/></a></div>
    <ol className="beta-steps"><li><span>01</span><div><strong>Abre el portal.</strong><p>Introduce tu código de invitación y descarga el ZIP para Apple Silicon.</p></div></li><li><span>02</span><div><strong>Instala Octagon.</strong><p>Descomprime el ZIP y mueve Octagon a Aplicaciones. Esta beta no está notarizada por Apple.</p></div></li><li><span>03</span><div><strong>Recibe nuevas versiones.</strong><p>Guarda el mismo código en Settings → General → Octagon updates y usa Check for updates.</p></div></li></ol>
  </div></section>;
}

function App() {
  return <><a className="skip" href="#contenido">Ir al contenido</a><div className="intro" id="inicio"><Header /><main id="contenido"><Hero />
    <div className="engines shell"><span className="engine-label">TUS MOTORES, JUNTOS</span><ul aria-label="Motores compatibles"><li>PostgreSQL</li><li>MySQL</li><li>MongoDB</li><li>Supabase</li><li>Redis</li><li>Valkey</li></ul></div>
    <Product/><Beta/></main></div><footer className="site-footer"><div className="shell footer-inner"><Brand/><p>Diseñado para quienes trabajan con datos.</p><a href="#inicio">Volver arriba <ArrowRight size={14} aria-hidden="true"/></a></div></footer></>;
}

createRoot(document.getElementById('root')).render(<App />);

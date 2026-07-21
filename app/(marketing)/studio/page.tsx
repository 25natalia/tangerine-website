import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal, RevealGroup } from "@/components/templates/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Studio",
  description:
    "Natalia García y Emy Dorado notaron esto: que el mundo se había llenado de cosas bien hechas y vacías.",
  path: "/studio",
});

const kicker = "font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase";

// Volumen II — los tres arquetipos, citados literalmente.
const archetypes = [
  {
    role: "Arquetipo dominante",
    variant: "primary" as const,
    name: "El Creador",
    body: "Tangerine existe, ante todo, para construir cosas que antes no existían. El Creador necesita expresar una visión propia y no tolera la copia ni la mediocridad complaciente; por eso empuja constantemente hacia adelante, incluso cuando lo seguro sería quedarse quieto.",
    risk: "Su riesgo natural es el perfeccionismo paralizante — la tentación de nunca soltar un trabajo porque siempre parece faltarle algo.",
  },
  {
    role: "Arquetipo secundario",
    variant: "secondary" as const,
    name: "El Sabio",
    body: "Antes de construir, el Sabio necesita entender. Este arquetipo es el que empuja a investigar antes de proponer, a cuestionar el brief en vez de aceptarlo tal como llega, a preferir la verdad incómoda sobre la mentira cómoda.",
    risk: "Su riesgo es la sobre-intelectualización: quedarse analizando un problema tanto tiempo que la acción nunca llega.",
  },
  {
    role: "Arquetipo de tensión",
    variant: "outline" as const,
    name: "El Rebelde",
    body: "Hay una parte de Tangerine que desconfía profundamente de lo establecido solo porque está establecido. El Rebelde es el que se niega a copiar Pinterest, a seguir una tendencia porque funciona, a hacer branding que podría pertenecer a cualquiera.",
    risk: "Su riesgo, si no se lo modera, es la rebeldía por la rebeldía: hacer algo distinto solo para diferenciarse, sin que esa diferencia resuelva nada real.",
  },
];

// Volumen II — Valores. Solo "qué significa" / "qué NO significa" de cada
// uno, tal como pide el alcance de esta fase — el resto de los campos
// (cómo se vive, cómo se demuestra, cómo se rompe) vive en el Brand OS.
const values = [
  {
    name: "Honestidad",
    meaning: "Decir lo que se piensa, incluso cuando cuesta, en el momento en que hace falta decirlo, no cuando resulta cómodo.",
    notMeaning: "Ser brusco, innecesariamente crítico o franco sin cuidado por cómo aterriza lo que se dice. La honestidad sin empatía es solo crueldad con excusa.",
  },
  {
    name: "Curiosidad",
    meaning: "El impulso genuino de entender algo antes de opinar sobre eso.",
    notMeaning: "Acumular información por acumularla, o investigar como excusa para posponer el trabajo real.",
  },
  {
    name: "Empatía",
    meaning: "Diseñar para alguien real, no para un público abstracto ni para el propio gusto.",
    notMeaning: "Darle a la persona lo que pide sin cuestionar si es lo que necesita.",
  },
  {
    name: "Cuidado",
    meaning: "La atención puesta en cada decisión, sin importar cuántas se tomen a la vez ni cuánto haya crecido el equipo.",
    notMeaning: "Perfeccionismo. El cuidado sabe cuándo algo está listo; el perfeccionismo nunca lo sabe.",
  },
  {
    name: "Coraje",
    meaning: "Sostener una idea propia incluso cuando la opción segura sería más fácil de defender.",
    notMeaning: "La provocación sin propósito, ni la incomodidad como estrategia de marketing.",
  },
  {
    name: "Comunidad",
    meaning: "Entender que ningún resultado importante se construye completamente solo.",
    notMeaning: "Consenso permanente ni evitar el desacuerdo por mantener la armonía.",
  },
];

export default function StudioPage() {
  return (
    <>
      {/* Intro */}
      <Container size="content" className="py-24 sm:py-32">
        <Reveal>
          <p className={kicker}>Studio</p>
          <h1 className="mt-6 font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl">
            Dos personas que notaron algo que a nadie más parecía molestarle.
          </h1>
        </Reveal>
      </Container>

      {/* Origen — Volumen I, §02 */}
      <section className="border-t border-(--border-subtle)">
        <Container size="reading" className="py-20 sm:py-24">
          <Reveal className="flex flex-col gap-6">
            <p className={kicker}>Origen</p>
            <p className="text-body-lg text-pretty">
              Natalia García y Emy Dorado notaron esto: que el mundo se había llenado de cosas
              bien hechas y vacías. Interfaces perfectas sin ningún error, y sin ninguna huella.
              Identidades correctas, entregadas a tiempo, olvidadas apenas una semana después. Un
              oficio entero —el suyo— empezando a medirse por lo rápido que podía producir en vez
              de por lo verdadero que podía ser.
            </p>
            <p className="text-pretty text-(--text-secondary)">
              No fundaron un estudio para corregir eso. Fundaron un estudio porque no encontraron
              ningún lugar donde esa incomodidad tuviera espacio para convertirse en trabajo.
              Empezaron con lo que cualquiera empieza cuando no tiene nada más que una intuición:
              pocos recursos, ningún nombre conocido, y la certeza incómoda de que hacer las
              cosas del modo en que las venían viendo hacer no era una opción.
            </p>
            <p className="text-pretty text-(--text-secondary)">
              Esa escasez, lejos de frenarlas, fue el primer material con el que construyeron
              algo. Descubrieron temprano lo que después se convertiría en principio: que un
              límite real, mirado de frente en vez de evitado, casi siempre esconde la mejor
              respuesta posible.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Manifiesto — Volumen I, §06, completo. Prosa larga: contenedor
         "reading" y fondo por defecto — se lee, no se decora. */}
      <section className="border-t border-(--border-subtle)">
        <Container size="reading" className="py-20 sm:py-24">
          <Reveal className="flex flex-col gap-6">
            <p className={kicker}>Manifiesto</p>
            <p className="font-display text-xl leading-snug font-semibold text-balance sm:text-2xl">
              Hubo un tiempo, para cada persona que existe, en el que crear no pedía permiso.
            </p>
            <div className="flex flex-col gap-5 text-pretty text-(--text-secondary)">
              <p>
                No hacía falta saber si algo iba a funcionar, si le iba a gustar a alguien, si
                tenía sentido. Se construía igual. Se nombraban las cosas sin preguntar si ya
                tenían nombre. Se defendía, con total seguridad, una idea que nadie más había
                pensado. Nadie enseñó a hacer eso. Ya se sabía hacer.
              </p>
              <p>
                Después, ese saber se perdió de vista. No de golpe: en la misma medida en que el
                mundo enseñó a preferir la respuesta correcta sobre la propia, a no llamar la
                atención, a elegir lo seguro antes que lo verdadero. Nada de eso robó la
                creatividad de nadie. Solo la escondió, hasta que dejó de sentirse como algo
                propio.
              </p>
              <p>
                Tangerine no cree que la creatividad sea un talento reservado para pocos. Cree
                que es una memoria compartida por todos, y que el trabajo de un lugar como este
                consiste, antes que nada, en ayudar a recordarla.
              </p>
              <p>
                Hay una fruta pequeña, de las que nadie mira dos veces, que resume esta idea
                mejor que cualquier discurso. Por fuera, apenas algo cotidiano. Por dentro, una
                estructura de piezas distintas que encajan sin necesidad de parecerse entre sí,
                sosteniendo juntas algo que ninguna podría sostener sola. Así se entiende, en
                este lugar, una marca. Así se entiende una comunidad. Así se entiende cualquier
                persona dispuesta a mostrarse tal como es.
              </p>
              <p>
                No se persiguen aquí las cosas raras por el simple gusto de ser raras. No se
                sigue una tendencia por el temor a quedar afuera. No se decora lo que ya funciona
                solo para que parezca distinto. La creatividad verdadera aparece en otro lugar:
                donde alguien mira de frente un límite real —poco tiempo, poco presupuesto, una
                idea que parece imposible— y, en lugar de rendirse o de forzar algo extravagante
                encima, encuentra ahí, adentro, la respuesta que ya estaba esperando. Una silla
                resuelta en una sola pieza de plástico. Un edificio que dice más con menos
                ornamento. Una marca que no necesita gritar para ser recordada.
              </p>
              <p>
                Esa manera de mirar no se improvisa. Se entrena observando, dudando,
                equivocándose las veces que haga falta hasta encontrar lo que de verdad importa.
                Por eso nunca se acepta aquí la primera idea que aparece. Por eso se investiga
                antes de proponer. Por eso se prefiere una verdad incómoda hoy a una comodidad
                que termine costando después.
              </p>
              <p>
                Pero nada de esto es, en el fondo, sobre diseño. Es sobre personas. Sobre la
                confianza de mostrar algo hecho con las propias manos y que de verdad representa
                a quien lo hizo. Sobre el orgullo de pertenecer a un lugar que no exige fingir.
                Sobre encontrar, en medio de un trabajo cualquiera, a alguien que piensa de un
                modo parecido y descubrir que esa forma extraña de ver las cosas nunca estuvo tan
                sola como parecía. Sobre construir, entre varios, algo que ninguno habría podido
                construir solo.
              </p>
              <p>
                No se quiere, en este lugar, un mundo donde todo funcione perfecto y se vea
                exactamente igual. Ese mundo ya existe, y es un mundo aburrido. Se prefiere uno
                con más textura, más carácter, más gente dispuesta a mostrar quién es de verdad,
                aunque esa no sea la opción más segura.
              </p>
              <p className="font-display text-lg font-semibold text-(--text-primary)">
                El mundo no necesita más cosas bonitas. Necesita más cosas que signifiquen algo.
              </p>
              <p>
                Y sin embargo, conviene no confundir el medio con el fin: la creatividad no es lo
                que se busca al final de este camino. Es apenas el camino. Lo único que de
                verdad importa es la posibilidad de construir algo que nadie más podría haber
                construido de esa forma exacta —una identidad tan clara que resulte imposible de
                confundir con cualquier otra.
              </p>
              <p>
                Para eso no hace falta ser diseñador. Hace falta estar dispuesto a observar con
                atención, a cuestionar lo obvio, a construir con intención, y después, a animarse
                a mostrarlo. Eso fue siempre todo lo que la creatividad pidió. Ya se sabía hacer.
                Solo se había olvidado.
              </p>
              <p>
                Tangerine no existe para que alguien sea más creativo. Existe para que se anime a
                construir algo que solo esa persona, esa marca, esa idea, podría haber
                construido.
              </p>
              <p className="text-(--text-primary)">
                Este es el punto exacto donde termina la reflexión y empieza el trabajo.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Arquetipos — Volumen II */}
      <section className="border-t border-(--border-subtle)">
        <Container size="wide" className="py-20 sm:py-24">
          <Reveal className="mb-12 max-w-xl">
            <p className={kicker}>Personalidad de marca</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
              Tres arquetipos en tensión permanente.
            </h2>
            <p className="mt-4 text-pretty text-(--text-secondary)">
              Los tres conviven en tensión permanente, y esa tensión —no la ausencia de ella— es
              lo que mantiene el trabajo honesto.
            </p>
          </Reveal>
          <RevealGroup className="grid gap-8 lg:grid-cols-3">
            {archetypes.map((a) => (
              <div key={a.name} className="flex flex-col gap-3">
                <Badge variant={a.variant}>{a.role}</Badge>
                <h3 className="font-display text-xl font-bold">{a.name}</h3>
                <p className="text-pretty text-(--text-secondary)">{a.body}</p>
                <p className="text-body-sm text-pretty text-(--text-tertiary)">{a.risk}</p>
              </div>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Valores — Volumen II */}
      <section className="border-t border-(--border-subtle)">
        <Container size="content" className="py-20 sm:py-24">
          <Reveal className="mb-4 max-w-xl">
            <p className={kicker}>Valores</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
              Lo que guía cada decisión, grande o pequeña.
            </h2>
          </Reveal>
          <div className="divide-y divide-(--border-subtle)">
            {values.map((v) => (
              <Reveal key={v.name} className="grid gap-3 py-10 sm:grid-cols-[10rem_1fr] sm:gap-8">
                <h3 className="font-display text-xl font-bold">{v.name}</h3>
                <div className="flex flex-col gap-3">
                  <p className="text-pretty">
                    <span className="font-semibold text-(--text-primary)">Qué significa: </span>
                    <span className="text-(--text-secondary)">{v.meaning}</span>
                  </p>
                  <p className="text-pretty">
                    <span className="font-semibold text-(--text-primary)">Qué NO significa: </span>
                    <span className="text-(--text-secondary)">{v.notMeaning}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

/* Sinteza decizionala — pagina 1 a memoriului (web + PDF). O singura pagina A4. */

export default function MemoriuSummary() {
  return (
    <section className="sinteza">
      <header className="sinteza__head">
        <div className="sinteza__kicker">Sinteză pentru decizie — o pagină</div>
        <h1 className="sinteza__title">
          De ce Loto <em>și</em> Pokerul: criteriul care face decizia ușor de
          apărat
        </h1>
        <p className="sinteza__sub">
          Pentru Domnul Primar și membrii Consiliului Local — esențialul, înainte
          de memoriul complet
        </p>
      </header>

      <div className="sinteza__facts">
        <div className="sinteza__fact">
          <div className="sinteza__fact-num">1</div>
          <p>
            <strong>Pokerul este un joc al minții, nu al norocului.</strong>{" "}
            Este recunoscut internațional ca sport al minții (IMSA, 2024 —
            alături de șah și bridge) și are Campionat Mondial din 1970 (World
            Series of Poker). Sloturile nu au și nu pot avea așa ceva: chiar
            legea română spune că la aparate abilitatea „nu are nicio
            influență" (art. 10 alin. (1) lit. e) din OUG 77/2009).
          </p>
        </div>
        <div className="sinteza__fact">
          <div className="sinteza__fact-num">2</div>
          <p>
            <strong>La poker joci împotriva altor oameni — nu împotriva casei.</strong>{" "}
            Clubul încasează doar un comision fix și nu câștigă nimic din
            pierderea jucătorului. La sloturi, cazinou și pariuri, operatorul
            câștigă exact ce pierde clientul.
          </p>
        </div>
        <div className="sinteza__fact">
          <div className="sinteza__fact-num">3</div>
          <p>
            <strong>Costul este fix și plafonat.</strong> Turneele au taxă de
            înscriere fixă și perioadă limitată de re-intrare; la cash-game
            există buy-in maxim la masă, prin regulament aprobat de ONJN. La
            aparate pierderea este nelimitată, la viteza a sute de rotiri pe
            oră.
          </p>
        </div>
        <div className="sinteza__fact">
          <div className="sinteza__fact-num">4</div>
          <p>
            <strong>Timpul petrecut la masă depinde de abilitate.</strong> Cine
            joacă bine rămâne în turneu; cine nu, iese la costul fix al
            înscrierii. La aparat rămâi exact cât mai ai bani — acesta este
            mecanismul dependenței, și el nu există la masa de poker.
          </p>
        </div>
        <div className="sinteza__fact">
          <div className="sinteza__fact-num">5</div>
          <p>
            <strong>Pokerul aduce turiști, ca UNTOLD.</strong> Marile platforme
            internaționale califică jucători la evenimente live, iar orașele
            care au păstrat pokerul — Paris, Londra, Praga, Viena, Bratislava —
            sunt destinații pe harta europeană. Paris și Viena au scos
            aparatele și cazinourile din oraș și au păstrat pokerul, cu
            validarea curților lor constituționale. Clubul din Cluj este deja
            listat pe circuitul internațional — orașul poate rămâne pe aceeași
            hartă.
          </p>
        </div>
      </div>

      <div className="sinteza__boxes">
        <div className="sinteza__box sinteza__box--solution">
          <div className="sinteza__box-title">
            Soluția — gata de implementat, nu doar o cerere
          </div>
          <ul>
            <li>
              Cluburile de poker funcționează <strong>exclusiv în hoteluri sau
              centre comerciale</strong> — fără vitrină stradală, la distanță de
              școli, în spații frecventate de public adult;
            </li>
            <li>
              <strong>Acces doar cu act de identitate</strong>, zero minori,
              zero aparate slot-machine în incintă — condiții de autorizare;
            </li>
            <li>
              <strong>Taxă locală anuală pe metru pătrat</strong> (art. 18^1 din
              OUG 77/2009) — venit nou, direcționabil către programele
              municipale anti-adicție.
            </li>
          </ul>
        </div>

        <div className="sinteza__box sinteza__box--mayor">
          <div className="sinteza__box-title">
            Argumentarul public al deciziei — formulări pe care decidentul le
            poate folosi ca atare
          </div>
          <ul className="sinteza__quotes">
            <li>
              „Nu am făcut o excepție pentru o afacere — am aplicat un criteriu:
              eliminăm jocurile contra casei, cu pierdere nelimitată, și păstrăm
              jocurile dintre oameni, cu cost fix și plafonat: Loto și pokerul."
            </li>
            <li>
              „Am mutat pokerul din stradă în hotel: zero vitrine, zero acces
              pentru minori, taxă locală dedicată combaterii dependenței."
            </li>
            <li>
              „Parisul și Viena au făcut exact asta — au scos aparatele, au
              păstrat pokerul — iar deciziile lor au trecut testul curților
              constituționale. Clujul aplică un model european verificat, nu
              improvizează."
            </li>
          </ul>
          <p className="sinteza__objection">
            <strong>La obiecția „tot jocuri de noroc sunt":</strong> legea
            însăși le desparte, la art. 10 din OUG 77/2009 — la aparat
            abilitatea „nu are nicio influență"; la poker rezultatul depinde
            preponderent de abilitate, motiv pentru care instanțele supreme
            germane îl impozitează ca activitate profesională. Criteriul nu este
            simpatia — este mecanismul care produce dependența.
          </p>
        </div>
      </div>

      <div className="sinteza__foot">
        Detalii, texte de lege și sursele fiecărei afirmații — în memoriul
        complet, pe paginile următoare.
      </div>
    </section>
  );
}

export function MemoriuShield() {
  return (
    <section className="sinteza sinteza--p2">
      <header className="sinteza__head">
        <div className="sinteza__kicker">
          Scutul juridic și răspunsurile la obiecții
        </div>
        <h1 className="sinteza__title">
          De ce această excepție <em>întărește</em> hotărârea — nu o slăbește
        </h1>
      </header>

      <div className="sinteza__boxes">
        <div className="sinteza__box sinteza__box--solution">
          <div className="sinteza__box-title">
            Trei motive juridice pentru care decidentul are de câștigat
          </div>
          <ul>
            <li>
              <strong>Interdicția rămâne pentru 118 din 119 locații (99%).</strong>{" "}
              Cu excepția inclusă, hotărârea rămâne cea mai dură măsură
              anti-păcănele din istoria orașului: toate sălile de sloturi, toate
              agențiile de pariuri și cazinourile dispar. Excepția privește o
              singură sală, fără niciun aparat.
            </li>
            <li>
              <strong>O excepție pe criteriu obiectiv face hotărârea mai greu de
              anulat în instanță.</strong> Operatorii de sloturi vor ataca
              hotărârea în contencios administrativ oricum. O interdicție
              totală, cu excepție doar pentru monopolul de stat (Loteria), e
              vulnerabilă la argumentul discriminării și al lipsei de
              proporționalitate (art. 7 și 9 din Codul administrativ). O
              hotărâre care tratează diferit situații pe care legea însăși le
              definește diferit (art. 10 din OUG 77/2009) demonstrează exact
              calibrarea pe care instanțele o cer — măsură țintită, nu
              arbitrară.
            </li>
            <li>
              <strong>Modelul e deja validat de curți constituționale.</strong>{" "}
              Parisul (aparate interzise, cluburi de poker licențiate) — validat
              de Conseil constitutionnel în 2026; Viena (aparate eliminate,
              jocuri de masă păstrate) — validată de Curtea Constituțională
              austriacă în 2015. Iar în România, Slatina și Iași au operat deja
              excepții pe tip de joc în hotărârile lor.
            </li>
          </ul>
        </div>

        <div className="sinteza__box sinteza__box--mayor">
          <div className="sinteza__box-title">
            Răspunsuri gata formulate — pentru ședință, presă și contestatari
          </div>
          <div className="sinteza__qa">
            <p>
              <strong>„Tot jocuri de noroc sunt."</strong> — Legea le desparte,
              nu noi: la aparate abilitatea „nu are nicio influență" (art. 10
              lit. e)); pokerul se joacă „exclusiv între participanți" (lit.
              d)), iar instanțele supreme germane îl impozitează ca activitate
              profesională, pentru că rezultatul depinde preponderent de
              abilitate. Criteriul nu este simpatia — este mecanismul care
              produce dependența.
            </p>
            <p>
              <strong>„De ce pokerul da și pariurile/sloturile nu?"</strong> —
              La sloturi și pariuri operatorul câștigă exact ce pierde clientul,
              iar pierderea e nelimitată. La poker clubul ia un comision fix,
              costul e plafonat prin buy-in, iar banii circulă între oameni.
              Sunt modele economice opuse — de aceea și riscul de dependență e
              concentrat la aparate: 75–80% din cazurile aflate în consiliere
              (Comisia de Productivitate, Australia).
            </p>
            <p>
              <strong>„E o favoare pentru o firmă."</strong> — Nu: excepția e
              definită prin categoria legală (art. 10 alin. (1) lit. d) din OUG
              77/2009) și e valabilă pentru orice operator care îndeplinește
              condițiile — sală specializată, zero aparate, acces exclusiv
              adulți, amplasare în hotel sau centru comercial. Criteriu, nu
              nume.
            </p>
            <p>
              <strong>„Să se mute în alt oraș."</strong> — Cererea nu dispare:
              migrează în jocuri private neautorizate, fără verificarea
              vârstei, fără plafoane, fără taxe — sau online, unde expunerea e
              continuă. Orașul pierde controlul și veniturile; problema rămâne.
              Reglementarea într-un spațiu controlat este soluția, nu exilul.
            </p>
          </div>
        </div>
      </div>

      <div className="sinteza__wins">
        <div className="sinteza__win">
          <div className="sinteza__win-k">Imagine</div>
          <div className="sinteza__win-v">
            Cea mai dură decizie anti-păcănele din România, intactă
          </div>
        </div>
        <div className="sinteza__win">
          <div className="sinteza__win-k">Control</div>
          <div className="sinteza__win-v">
            Zero vitrine stradale; joc doar în spații pentru adulți
          </div>
        </div>
        <div className="sinteza__win">
          <div className="sinteza__win-k">Venit</div>
          <div className="sinteza__win-v">
            Taxă locală anuală, direcționabilă către programe anti-adicție
          </div>
        </div>
      </div>
    </section>
  );
}

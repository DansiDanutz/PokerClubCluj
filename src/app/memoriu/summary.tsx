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

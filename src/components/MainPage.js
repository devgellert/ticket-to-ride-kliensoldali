import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import css from "./MainPage.module.scss";
import { SocketContext } from "../SocketContext";

const MainPage = ({ history }) => {
  const [newName, setNewName] = React.useState("");
  const [newCount, setNewCount] = React.useState(1);
  const [connectName, setConnectName] = React.useState("");
  const [connectId, setConnectId] = React.useState(1);

  const { createRoom, joinRoom, emit } = useContext(SocketContext);

  const createRoomClick = () =>
    createRoom(newCount, newName, () => {
      history.push("/waiting");
    });

  const joinGameClick = () =>
    joinRoom(connectId, (roomId) => {
      history.push("/waiting");
      // emit("sync-action");
    });

  return (
    <div className={css["main-page"]}>
      <h1>Ticket to ride</h1>
      <section>
        <h2>Játékszabály:</h2>
        <div>
          Egy játékos a körében a következő három lehetőség közül választ:
          Vasútkocsi-kártyát húz: ezt megteheti a felfedett kártyák közül,
          ilyenkor húzás után azonnal pótolni kell a lapot, vagy a talonból is
          húzhat. A mozdony két kártyát ér, így azt másodkként nem lehet húzni a
          felfedettek közül (talonból akár 2 is húzható). Ha a felfedett lapok
          között 3 mozdony van, akkor az 5 lap megy a dobópakliba, és 5 újat
          kell osztani. Útvonalat épít: ekkor az útvonal színének megfelelő
          mennyiségű lapot kell kijátszania a kezéből. Szürke utak bármilyen, de
          egyféle színből megépíthetők. A mozdonyt ábrázoló utakhoz legalább
          annyi mozdonyt kell kijátszani, ahányat az út ábrázol. A mozdony
          egyébként joker, bármilyen vonatkocsi-kártyát helyettesíthet. A
          vagonokat fel kell helyezni a táblára. Az épített út pontértéke
          azonnal feltüntetésre kerül. A dupla sínpárokat az alap feladatból
          kihagyjuk, azaz minden várost csak egy sínpár köt össze. Plusz pontért
          lehet a dupla sínpárokat figyelembe venni: ahol dupla sínpár van két
          város között, oda ugyanaz a játékos nem építhet kétszer. Továbbá 1-3
          játékos esetén pedig csak az egyik sínpár építhető meg, de ezt a
          szabályt is plusz pontért lehet alkalmazni. Új célkártyákat húz: 3 új
          célkártya húzható, ebből legalább 1-et (legfeljebb 3-at) meg kell
          tartani. Ezt úgy egyszerűsítjük, hogy ezt a fázist kihagyjuk, és a
          játék elején mindenki kap 5 célkártyát, amiket teljesíteni kell. Plusz
          pontért lehet implementálni ezt a funkciót. Ld. a pontozásokat.
          Vasútkocsi-kártyák: lila, fehér, kék, sárga, narancs, fekete, piros,
          zöld: mindegyikből 12db mozdony: 14db A játék akkor ér véget, ha
          valamelyik játékos raktárában a vagonok száma 2 vagy kevesebb lesz.
          Ekkor az összes játékosnak van még egy utolsó köre, beleértve azt is,
          akinek először lefogyott ennyire. Ezután a pontok kiszámítása
          következik: (az utak hosszát menet közben számoljuk;) a teljesített
          célok pontértéke hozzáadásra kerül; a nem teljesített célok értéke
          levonásra kerül; a leghosszabb összefüggő út tulajdonosa +10 pontot
          kap.
        </div>
      </section>

      <section>
        <h2>Új játék indítása</h2>
        <input
          type="number"
          placeholder="Játékosok száma"
          value={newCount}
          onChange={(e) => {
            const newVal = e.target.value;
            if (newVal < 1 || newVal > 6) return;
            setNewCount(newVal);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Név"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <br />
        <button onClick={createRoomClick}>Indítás</button>
      </section>

      <section>
        <h2>Csatlakozás szobához</h2>
        <input
          type="text"
          placeholder="Név"
          value={connectName}
          onChange={(e) => setConnectName(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Szoba azonosító"
          value={connectId}
          onChange={(e) => setConnectId(e.target.value)}
        />{" "}
        <br />
        <button onClick={joinGameClick}>Csatlakozás</button>
      </section>
    </div>
  );
};

export default withRouter(MainPage);

import React from "react";
import { useEffect, useState } from "react";
import { ticketToRideData as data } from "../../../../../../../../ticket-to-ride-data";
import css from "./CardSection.module.scss";
import { v4 as uuid } from "uuid";
import FieldLocomotiveCard from "./components/field_locomotive_card/FieldLocomotiveCard";
import { connect } from "react-redux";
import { setLocomotiveField } from "../../../../../../../../redux/actions";
import shuffle from "../../../../../../../../utils/shuffle";

const CardSection = ({ deck, setLocomotiveField, locomotiveField }) => {
  const { destinations } = data;

  const [aimDeck, setAimDeck] = useState([]);

  const handlePutLocomotivesToField = () => {
    const MAX_COUNT = 5;
    const newLocomotiveField = [];
    while (newLocomotiveField.length < MAX_COUNT) {
      const keys = window.Object.keys(deck);
      const shuffledKeys = shuffle(keys);
      const newKey = shuffledKeys[0];
      newLocomotiveField.push({
        color: newKey,
        id: uuid(),
      });
    }
    setLocomotiveField(newLocomotiveField);
  };

  useEffect(() => {
    const keys = window.Object.keys(destinations);
    const shuffledKeys = shuffle(keys);

    const newAimDeck = [];
    shuffledKeys.forEach((key) => {
      newAimDeck.push(destinations[key]);
    });
    setAimDeck(newAimDeck);
    //
    handlePutLocomotivesToField();
  }, []);

  useEffect(() => {
    // TODO: 3 mozdony kártyánál minden eldobása, 5 kártya húzása.
  }, [locomotiveField]);

  const aims = (
    <>
      {/*TODO: plusz pontért van cél húzás*/}
      {/*<div className={css["title-wrap"]}>*/}
      {/*  <h2>Célok:</h2>*/}
      {/*</div>*/}
      {/*<div*/}
      {/*  className={css["deck"]}*/}
      {/*  style={{ backgroundImage: 'url("/card-back.png")' }}*/}
      {/*/>*/}
    </>
  );
  const locomotives = (
    <>
      {/*TODO: Ha bekerül a cél pakli, megkülönböztetésért*/}
      {/*<div className={css["title-wrap"]}>*/}
      {/*  <h2>Vasutak:</h2>*/}
      {/*</div>*/}
      <div
        className={css["deck"]}
        style={{ backgroundImage: 'url("/card-back.png")' }}
      />
      {locomotiveField.map((elem) => (
        <FieldLocomotiveCard
          color={elem.color}
          id={elem.id}
          onClick={(id) => {
            // remove card with id
            const newLocomotiveField = locomotiveField.filter(
              (elem) => elem.id !== id
            );
            setLocomotiveField(newLocomotiveField);
          }}
        />
      ))}
    </>
  );

  return (
    <div className={css["card-section"]}>
      {aims}
      {locomotives}
    </div>
  );
};

const mapStatToProps = (state) => ({
  deck: state.deck,
  locomotiveField: state.locomotiveField,
});

const mapDispatchToProps = {
  setLocomotiveField,
};

export default connect(mapStatToProps, mapDispatchToProps)(CardSection);

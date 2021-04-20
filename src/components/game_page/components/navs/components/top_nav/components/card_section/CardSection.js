import React from "react";
import css from "./CardSection.module.scss";
import FieldLocomotiveCard from "./components/field_locomotive_card/FieldLocomotiveCard";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import generalEssentialSelectors from "../../../../../../../../redux/general/selectors/generalEssentialSelectors";
import playersEssentialSelectors from "../../../../../../../../redux/players/selectors/playersEssentialSelectors";
import playerActions from "../../../../../../../../redux/players/playersActions";
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";

const CardSection = ({}) => {
  const field = useSelector(generalEssentialSelectors.getField);
  const prevPlayers = useSelector(playersEssentialSelectors.getPlayers);
  const activePlayerIndex = useSelector(
    playersEssentialSelectors.getActivePlayerIndex
  );
  const canDrawCard = useSelector(playersDerivativeSelectors.canDrawCard);

  const dispatch = useDispatch();

  const handleCardClick = (id) => {
    if (!canDrawCard) return;

    const clickedCard = field.find((elem) => elem.id === id);
    if (!clickedCard) return;

    const newField = field.filter((elem) => elem.id !== clickedCard.id);

    const players = map(prevPlayers, (player, index) => {
      if (activePlayerIndex !== index) return player;

      return {
        ...player,
        hand: {
          ...player.hand,
          cards: [...player.hand.cards, clickedCard],
        },
      };
    });

    dispatch(
      playerActions.cardDrawSuccess({
        field: newField,
        players,
      })
    );
  };

  const locomotives = (
    <>
      <div
        className={css["deck"]}
        style={{ backgroundImage: 'url("/card-back.png")' }}
        onClick={() => {
          // putCardInHand(getRandomValidColorFromDeck());
        }}
      />
      {field.map((elem) => (
        <FieldLocomotiveCard
          key={elem.id}
          color={elem.type}
          id={elem.id}
          onClick={handleCardClick}
        />
      ))}
    </>
  );

  return <div className={css["card-section"]}>{locomotives}</div>;
};

export default CardSection;

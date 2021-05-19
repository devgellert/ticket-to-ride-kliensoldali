import React from "react";
import { map } from "lodash";
import { useSelector } from "react-redux";
//
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";
//
import PlayerCardsWrap from "../player_cards_wrap/PlayerCardsWrap";
import PlayerDestinationCard from "../player_destination_card/PlayerDestinationCard";
//
import css from "./Destinations.module.scss";

const Destinations = () => {
  const activePlayerDestinations = useSelector(
    playersDerivativeSelectors.getActivePlayerDestinations
  );

  return (
    <>
      <div className={css["header-wrap"]}>
        <h2>Célok:</h2>
      </div>

      <PlayerCardsWrap>
        {map(activePlayerDestinations, (destination, index) => (
          <PlayerDestinationCard
            connectionIds={destination.elements}
            key={index}
            from={destination.fromCity}
            to={destination.toCity}
            points={destination.value}
            fromId={destination.from}
            toId={destination.to}
          />
        ))}
      </PlayerCardsWrap>
    </>
  );
};

export default Destinations;

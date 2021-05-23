import React, { useContext } from "react";
import { map } from "lodash";
import { useSelector } from "react-redux";
//
import playersDerivativeSelectors from "../../../../../../../../redux/players/selectors/playersDerivativeSelectors";
//
import PlayerCardsWrap from "../player_cards_wrap/PlayerCardsWrap";
import PlayerDestinationCard from "../player_destination_card/PlayerDestinationCard";
//
import css from "./Destinations.module.scss";
import { SocketContext } from "../../../../../../../../SocketContext";

const Destinations = () => {
  const { playerIndex } = useContext(SocketContext);
  const playerDestinations = useSelector((state) =>
    playersDerivativeSelectors.getPlayerDestinations(state, playerIndex)
  );

  return (
    <>
      <div className={css["header-wrap"]}>
        <h2>Célok:</h2>
      </div>

      <PlayerCardsWrap>
        {map(playerDestinations, (destination, index) => (
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

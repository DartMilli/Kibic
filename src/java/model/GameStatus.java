/*
 * property of Milán Szlávik
 */
package model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import tools.Exclude;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class GameStatus {

    private String game;
    private String player;
    private String caller;
    private Integer round;
    private List<String> talon;
    @SerializedName("cardsingame")
    private List<String> cardsInGame;
    private Player gamer;
    @SerializedName("rightgamer")
    private Player rightGamer;
    @SerializedName("leftgamer")
    private Player leftGamer;

    public GameStatus() {
        talon = new ArrayList<>();
        cardsInGame = new ArrayList<>();
    }

    public String getGame() {
        return game;
    }

    public void setGame(String game) {
        this.game = game;
    }

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public String getCaller() {
        return caller;
    }

    public void setCaller(String caller) {
        this.caller = caller;
    }

    public Integer getRound() {
        return round;
    }

    public void setRound(Integer round) {
        this.round = round;
    }

    public List<String> getTalon() {
        return talon;
    }

    public void setTalon(List<String> talon) {
        this.talon = talon;
    }

    public List<String> getCardsInGame() {
        return cardsInGame;
    }

    public void setCardsInGame(List<String> cardsInGame) {
        this.cardsInGame = cardsInGame;
    }

    public Player getGamer() {
        return gamer;
    }

    public void setGamer(Player gamer) {
        this.gamer = gamer;
    }

    public Player getRightGamer() {
        return rightGamer;
    }

    public void setRightGamer(Player rightGamer) {
        this.rightGamer = rightGamer;
    }

    public Player getLeftGamer() {
        return leftGamer;
    }

    public void setLeftGamer(Player leftGamer) {
        this.leftGamer = leftGamer;
    }

    @Override
    public String toString() {
        return "GameStatus{" + "game=" + game + ", player=" + player + ", caller=" + caller + ", round=" + round + ", talon=" + talon + ", cardsInGame=" + cardsInGame + ", gamer=" + gamer + ", rightGamer=" + rightGamer + ", leftGamer=" + leftGamer + '}';
    }

    public void sortCards() {
        Card.sortStrCardList(cardsInGame);
        Player p;
        List<String> tmpLst;
        for (int i = 0; i < 3; i++) {
            switch (i) {
                case 1:
                    p = leftGamer;
                    break;
                case 2:
                    p = rightGamer;
                    break;
                case 0:
                default:
                    p = gamer;
                    break;
            }
            tmpLst = p.getHand();
            Card.sortStrCardList(tmpLst);
            p.setHand(tmpLst);
        }
    }

    public static void updateStatus(GameStatus gs) {
        int round = gs.getRound();
        Player gamer = gs.getGamer();
        switch (round) {
            case -1:
                if (gamer.getHand().size() >= 10) {
                    gamer.setUnknownCards(0);
                    gs.setRound(0);
                }
                break;
            case 0:
                break;
            case 1:
                break;
            default:
                break;

        }
        gs.sortCards();
    }
}

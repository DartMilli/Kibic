/*
 * property of Milán Szlávik
 */
package model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class GameStatus {
    private String game;
    private String player;
    private int round;
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

    public int getRound() {
        return round;
    }

    public void setRound(int round) {
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
        return "GameStatus{" + "game=" + game + ", player=" + player + ", round=" + round + ", talon=" + talon + ", cardsInGame=" + cardsInGame + ", gamer=" + gamer + ", rightGamer=" + rightGamer + ", leftGamer=" + leftGamer + '}';
    }
    
    
}

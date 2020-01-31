/*
 * property of Milán Szlávik
 */
package model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import tools.Exclude;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class Player {
    @Exclude
    private String name; 
    @SerializedName("unknowncards")
    private int unknownCards;
    private List<String> calls;
    private List<String> thrown;
    private List<String> hand;
    private BeatedCards beated;

    public Player() {
        calls = new ArrayList<>();
        hand = new ArrayList<>();
        thrown = new ArrayList<>();
    }

    public int getUnknownCards() {
        return unknownCards;
    }

    public void setUnknownCards(int unknownCards) {
        this.unknownCards = unknownCards;
    }

    public List<String> getCalls() {
        return calls;
    }

    public void setCalls(List<String> calls) {
        this.calls = calls;
    }

    public List<String> getThrown() {
        return thrown;
    }

    public void setThrown(List<String> thrown) {
        this.thrown = thrown;
    }
    
    public List<String> getHand() {
        return hand;
    }

    public void setHand(List<String> hand) {
        this.hand = hand;
    }

    public BeatedCards getBeated() {
        return beated;
    }

    public void setBeated(BeatedCards beated) {
        this.beated = beated;
    }  

    @Override
    public String toString() {
        return "Player{" + "unknownCards=" + unknownCards + ", calls=" + calls + ", thrown=" + thrown + ", hand=" + hand + ", beated=" + beated + '}';
    }
}

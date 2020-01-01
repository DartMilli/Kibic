/*
 * property of Milán Szlávik
 */
package model;

import com.google.gson.annotations.SerializedName;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class BeatedCards {
    @SerializedName("round 1")
    private String[] round1;
    @SerializedName("round 2")
    private String[] round2;
    @SerializedName("round 3")
    private String[] round3;
    @SerializedName("round 4")
    private String[] round4;
    @SerializedName("round 5")
    private String[] round5;
    @SerializedName("round 6")
    private String[] round6;
    @SerializedName("round 7")
    private String[] round7;
    @SerializedName("round 8")
    private String[] round8;
    @SerializedName("round 9")
    private String[] round9;
    @SerializedName("round 10")
    private String[] round10;

    public BeatedCards() {
        round1 = new String[3];
        round2 = new String[3];
        round3 = new String[3];
        round4 = new String[3];
        round5 = new String[3];
        round6 = new String[3];
        round7 = new String[3];
        round8 = new String[3];
        round9 = new String[3];
        round10 = new String[3];
    }

    public String[] getRound1() {
        return round1;
    }

    public void setRound1(String[] round1) {
        this.round1 = round1;
    }

    public String[] getRound2() {
        return round2;
    }

    public void setRound2(String[] round2) {
        this.round2 = round2;
    }

    public String[] getRound3() {
        return round3;
    }

    public void setRound3(String[] round3) {
        this.round3 = round3;
    }

    public String[] getRound4() {
        return round4;
    }

    public void setRound4(String[] round4) {
        this.round4 = round4;
    }

    public String[] getRound5() {
        return round5;
    }

    public void setRound5(String[] round5) {
        this.round5 = round5;
    }

    public String[] getRound6() {
        return round6;
    }

    public void setRound6(String[] round6) {
        this.round6 = round6;
    }

    public String[] getRound7() {
        return round7;
    }

    public void setRound7(String[] round7) {
        this.round7 = round7;
    }

    public String[] getRound8() {
        return round8;
    }

    public void setRound8(String[] round8) {
        this.round8 = round8;
    }

    public String[] getRound9() {
        return round9;
    }

    public void setRound9(String[] round9) {
        this.round9 = round9;
    }

    public String[] getRound10() {
        return round10;
    }

    public void setRound10(String[] round10) {
        this.round10 = round10;
    }
      
}

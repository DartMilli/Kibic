/*
 * property of Milán Szlávik
 */
package model;

import com.google.gson.annotations.SerializedName;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class Card implements Comparable<Card>{
    private String id;
    private String name;
    private String path;
    private String color;
    @SerializedName("coloredorder")
    private Integer coloredOrder;
    private Integer order;
    @SerializedName("gamevalue")
    private Integer gameValue;
    @SerializedName("coloredbeatvalue")
    private Integer coloredBeatValue;
    @SerializedName("beatvalue")
    private Integer beatValue;

    public Card() {
        coloredBeatValue = 0;
        order = 0;
        gameValue = 0;
        coloredOrder = 0;
        beatValue = 0;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getColoredOrder() {
        return coloredOrder;
    }

    public void setColoredOrder(Integer coloredOrder) {
        this.coloredOrder = coloredOrder;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Integer getGameValue() {
        return gameValue;
    }

    public void setGameValue(Integer gameValue) {
        this.gameValue = gameValue;
    }

    public Integer getColoredBeatValue() {
        return coloredBeatValue;
    }

    public void setColoredBeatValue(Integer coloredBeatValue) {
        this.coloredBeatValue = coloredBeatValue;
    }

    public Integer getBeatValue() {
        return beatValue;
    }

    public void setBeatValue(Integer beatValue) {
        this.beatValue = beatValue;
    }

    @Override
    public String toString() {
        return "Card{name=" + name + '}';
    }

    @Override
    public int compareTo(Card c) {
        return this.coloredBeatValue-c.getColoredBeatValue();
    }
    
    public int compareTo(Card c, Game g) {
        if (g.getColor() == null) {
            return this.beatValue-c.getBeatValue();
        }else{
            return this.coloredBeatValue-c.getColoredBeatValue();
        }        
    }
}

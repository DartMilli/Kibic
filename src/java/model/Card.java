/*
 * property of Milán Szlávik
 */
package model;

import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;
import com.google.gson.reflect.TypeToken;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import tools.Exclude;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class Card implements Comparable<Card> {

    private String id;
    private String name;
    private String path;
    private String color;
    @SerializedName("coloredorder")
    private Integer coloredOrder;
    @SerializedName("noncoloredorder")
    private Integer order;
    @SerializedName("gamevalue")
    private Integer gameValue;
    @SerializedName("coloredbeatvalue")
    private Integer coloredBeatValue;
    @SerializedName("noncoloredbeatvalue")
    private Integer beatValue;

    @Exclude
    private static List<Card> allCards;

    static {
        String url = "http://localhost:8080/Kibic/js/cards.json";
        String jsonText = "";
        try (InputStream is = new URL(url).openStream()) {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            StringBuilder sb = new StringBuilder();
            int cp;
            while ((cp = rd.read()) != -1) {
                sb.append((char) cp);
            }
            jsonText = sb.toString();;
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        allCards = new Gson().fromJson(jsonText, new TypeToken<List<Card>>() {
        }.getType());
        System.out.println(allCards);

    }

    public Card() {
        coloredBeatValue = 0;
        order = 0;
        gameValue = 0;
        coloredOrder = 0;
        beatValue = 0;
    }

    public Card(String cardId) {
        for (int i = 0; i < Card.allCards.size(); i++) {
            if (Card.allCards.get(i).getId().equals(cardId)) {
                copyProperties(Card.allCards.get(i));
            }
        }
    }

    public Card(Card card) {
        copyProperties(card);
    }

    private void copyProperties(Card card) {
        this.id = card.getId();
        this.name = card.getName();
        this.path = card.getPath();
        this.color = card.getColor();
        this.coloredOrder = card.getColoredOrder();
        this.order = card.getOrder();
        this.gameValue = card.getGameValue();
        this.coloredBeatValue = card.getColoredBeatValue();
        this.beatValue = card.getBeatValue();
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
        return this.coloredOrder - c.getColoredOrder();
    }

    public int compareTo(Card c, Game g) {
        if (g.getColor() == null) {
            return this.beatValue - c.getBeatValue();
        } else {
            return this.coloredBeatValue - c.getColoredBeatValue();
        }
    }
    
    public static void sortStrCardList(List<String> strCardsToBeSort){
        List<Card> cards = new ArrayList<>();
        for (int i = 0; i < strCardsToBeSort.size(); i++) {
            cards.add(new Card(strCardsToBeSort.get(i)));            
        }
        Collections.sort(cards);
        strCardsToBeSort.clear();
        for (int i = 0; i < cards.size(); i++) {
            strCardsToBeSort.add(cards.get(i).getId());            
        }        
    }
}

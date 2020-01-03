/*
 * property of Milán Szlávik
 */
package model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class Game implements Comparable<Game>{
    private Integer order;
    private Integer point;
    private String name;
    private String color;
    private List<String> games;
    private Map<String, Boolean> csendes;

    public Game() {
        games = new ArrayList<>();
        csendes = new HashMap<>();
        order = 0;
        point = 0;
    }
    
    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<String> getGames() {
        return games;
    }

    public void setGames(List<String> games) {
        this.games = games;
    }

    public Map<String, Boolean> getCsendes() {
        return csendes;
    }

    public void setCsendes(Map<String, Boolean> csendes) {
        this.csendes = csendes;
    }

    @Override
    public String toString() {
        return "Game{" + "name=" + name + '}';
    }

    @Override
    public int compareTo(Game g) {
        return this.order-g.getOrder();
    }
}

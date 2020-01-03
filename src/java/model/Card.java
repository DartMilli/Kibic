/*
 * property of Milán Szlávik
 */
package model;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class Card {
    private String id;
    private String name;
    private String path;
    private String color;

    public Card() {
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

    @Override
    public String toString() {
        return "Card{" + "id=" + id + ", name=" + name + '}';
    }
    
}

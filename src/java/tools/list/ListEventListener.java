/*
 * property of Milán Szlávik
 */
package tools.list;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public interface ListEventListener {
    public <T> void listEvent(ListEventArgs<T> args);
}

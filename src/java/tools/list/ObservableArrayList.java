/*
 * property of Milán Szlávik
 */
package tools.list;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Set;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class ObservableArrayList<T> implements List<T> {

    private List<T> innerList;
    private Set<ListEventListener> listeners;

    public ObservableArrayList() {
        innerList = new ArrayList<>();
        listeners = new HashSet<>();
    }

    @Override
    public int size() {
        return innerList.size();
    }

    @Override
    public boolean isEmpty() {
        return innerList.isEmpty();
    }

    @Override
    public boolean contains(Object o) {
        return innerList.contains(o);
    }

    @Override
    public Iterator<T> iterator() {
        return innerList.iterator();
    }

    @Override
    public Object[] toArray() {
        return innerList.toArray();
    }

    @Override
    public <T> T[] toArray(T[] ts) {
        return innerList.toArray(ts);
    }

    @Override
    public boolean add(T e) {
        boolean result = innerList.add(e);
        if (result) {
            ListEventArgs<T> args = new ListEventArgs<>(this, OperationTypeEnum.ADD, e);
            onFireEvent(args);
        }
        return result;
    }

    @Override
    public boolean remove(Object o) {
        boolean result = innerList.remove(o);
        if (result) {
            ListEventArgs<T> args = new ListEventArgs<>(this, OperationTypeEnum.DELETE, (T) o);
            onFireEvent(args);
        }
        return result;
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        return innerList.containsAll(c);
    }

    @Override
    public boolean addAll(Collection<? extends T> c) {
        boolean result = true;
        for (T t : c) {
            result &= add(t);
        }
        return result;
    }

    @Override
    public boolean addAll(int index, Collection<? extends T> c) {
        int originalSize = size();
        for (T t : c) {
            add(index, t);
            index++;
        }
        return size() == originalSize + c.size();
    }

    @Override
    public boolean removeAll(Collection<?> c) {
        boolean result = true;
        for (Object t : c) {
            result &= remove(t);
        }
        return result;
    }

    @Override
    public boolean retainAll(Collection<?> c) {
        return innerList.retainAll(c);
    }

    @Override
    public void clear() {
        innerList.clear();
        onFireEvent(new ListEventArgs<T>(this, OperationTypeEnum.CLEAR, null));
    }

    @Override
    public T get(int index) {
        return innerList.get(index);
    }

    @Override
    public T set(int index, T element) {
        return innerList.set(index, element);
    }

    @Override
    public void add(int index, T element) {
        innerList.add(index, element);
        onFireEvent(new ListEventArgs<T>(this, OperationTypeEnum.ADD, element));
    }

    @Override
    public T remove(int index) {
        T element = innerList.remove(index);
        onFireEvent(new ListEventArgs<T>(this, OperationTypeEnum.DELETE, element));
        return element;
    }

    @Override
    public int indexOf(Object o) {
        return innerList.indexOf(o);
    }

    @Override
    public int lastIndexOf(Object o) {
        return innerList.lastIndexOf(o);
    }

    @Override
    public ListIterator<T> listIterator() {
        return innerList.listIterator();
    }

    @Override
    public ListIterator<T> listIterator(int index) {
        return innerList.listIterator(index);
    }

    @Override
    public List<T> subList(int fromIndex, int toIndex) {
        return innerList.subList(fromIndex, toIndex);
    }

    private void onFireEvent(ListEventArgs<T> args) {
        for (ListEventListener listener : listeners) {
            listener.listEvent(args);
        }
    }

    public void addListEventListener(ListEventListener l) {
        listeners.add(l);
    }

    public void removeListEventListener(ListEventListener l) {
        listeners.remove(l);
    }

}

/*
 * property of Milán Szlávik
 */
package tools.list;

import java.util.List;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class ListEventArgs<T> {
    private List<T> list;
    private OperationTypeEnum operationType;
    private T element;

     ListEventArgs(List<T> list, OperationTypeEnum operationType, T element) {
        this.list = list;
        this.operationType = operationType;
        this.element = element;
    }

    public List<T> getList() {
        return list;
    }

    public OperationTypeEnum getOperationType() {
        return operationType;
    }

    public T getElement() {
        return element;
    }
}

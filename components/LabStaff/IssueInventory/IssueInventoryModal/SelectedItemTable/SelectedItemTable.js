import styles from "./SelectedItemTable.module.css";

export default function SelectedItemTable(props) {
  return (
    <div className={styles["main-table"]}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(props.items).map(function (keyName, keyIndex) {
            // use keyName to get current key's name
            // and a[keyName] to get its value
            return (
              <tr>
                <td>{props.items[keyName].name}</td>
                <td>{props.items[keyName].model}</td>
                <td>
                  <input
                    onChange={(event) =>
                      props.updateQuantity(keyName, event.target.value)
                    }
                    max={props.items[keyName].max_quantity}
                    type="number"
                    value={props.items[keyName].quantity}
                  ></input>
                </td>
                <td>
                  <button
                    onClick={() => {
                      props.remove_item_listener(keyName);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

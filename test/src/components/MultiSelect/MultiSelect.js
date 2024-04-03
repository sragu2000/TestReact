import { MultiSelectIcons } from "./Icons";
import styles from "./MultiSelect.module.css"
import { useState } from "react";
const MultiSelect = () => {
    const [showSelectPanel, setShowSelectPanel] = useState(false);
    const [buttonWidth, setButtonWidth] = useState("");

    const [selectedItems, setSelectedItems] = useState([]);
    const [options, setOptions] = useState([
        { "label": "Srilanka", "value": "LK" },
        { "label": "Canada", "value": "CA" },
        { "label": "Australia", "value": "AU" },
        { "label": "United States", "value": "US" },
        { "label": "United", "value": "U" }
    ])

    const isObjectInTheArray = (targetObject, targetArray) => {
        // sample target object -> { "label": "Srilanka", "value": "LK" }
        if (Array.isArray(targetArray)) {
            return targetArray.filter((item) => {
                return item.label === targetObject.label
            }).length > 0 ? true : false
        } else {
            return false;
        }
    }

    const removeObjectItemFromArray = (targetObject, targetArray) => {
        if (Array.isArray(targetArray)) {
            return targetArray.filter((item) => {
                return item.label !== targetObject.label
            })
        } else {
            console.error("Given variable is not an array !")
            return [];
        }
    }

    const handleUserSelect = (changedObject) => {
        if (isObjectInTheArray(changedObject, selectedItems)) {
            setSelectedItems(removeObjectItemFromArray(changedObject, selectedItems));
            setOptions([...options, changedObject]);
        } else {
            setSelectedItems([...selectedItems, changedObject]);
            setOptions(removeObjectItemFromArray(changedObject, options));
        }
        setShowSelectPanel(false);
    }

    console.log(selectedItems)

    const hanldeSelectPanel = () => {
        if (showSelectPanel === false) {
            setShowSelectPanel(true);
        } else {
            setShowSelectPanel(false);
        }
    }

    return (
        <div className={styles.multiSelectContainer}>
            <div className={styles.control} onClick={hanldeSelectPanel}>
                <span className={styles.valueContainer}>
                    {selectedItems.length === 0 ? <span className={styles.input}>Select</span> : selectedItems.map((item) => {
                        return (
                            <span className={styles.multiValue}>
                                <span className={styles.multiValueGeneric}>{item.label}</span>
                                <div className={styles.multiValueRemove} onClick={()=>{alert("Removed")}}>x</div>
                            </span>
                        )
                    })}
                </span>
                <span className={styles["indicatorSeparator"]}></span>
                <span className={styles.indicatorContainer}>
                    {
                        showSelectPanel ? MultiSelectIcons.caretUp : MultiSelectIcons.caretDown
                    }
                </span>

            </div>
            {
                showSelectPanel &&
                <div className={styles.multiSelectPanel} style={{ "width": buttonWidth }}>
                    {
                        Array.isArray(options)
                            ?
                            options.length > 0 ?
                                options.map((option, optionIndex) => {
                                    return (
                                        <div className={styles.singleOption}>
                                            <input
                                                style={{ "display": "none" }}
                                                id={`multiSelectOption${optionIndex}`}
                                                type="checkbox" value={option.value}
                                                onChange={(e) => { handleUserSelect({ "label": option.label, "value": option.value }) }}
                                            />
                                            <label className={styles.labelStyle} htmlFor={`multiSelectOption${optionIndex}`}>{option.label}</label>
                                        </div>
                                    )
                                })
                                : <span> No Options</span>
                            : "Invalid Options"
                    }
                </div>
            }
        </div>
    );
}

export default MultiSelect;
import { MultiSelectIcons } from "./Icons";
import styles from "./MultiSelect.module.css"
import { useEffect, useRef, useState } from "react";
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
    


    // const handleUserSelect = (selectedObj) => {
    //     let isItemAlreadySelected = selectedItems.filter((item) => {
    //         return item.label === selectedObj.label
    //     })
    //     console.log(isItemAlreadySelected)
    //     if (isItemAlreadySelected.length === 0) {
    //         setSelectedItems([...selectedItems, selectedObj]);
    //     } else {
    //         let s = selectedItems.filter((item) => {
    //             return item.label !== selectedObj.label
    //         })
    //         setSelectedItems(s);
    //     }
    // }

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
    }


    const hanldeSelectPanel = () => {
        if (showSelectPanel === false) {
            setShowSelectPanel(true);
        } else {
            setShowSelectPanel(false);
        }
    }

    return (
        <div className={styles.multiSelectContainer}>
            <div className={styles.multiSelectButton} onClick={hanldeSelectPanel}>
                <span>
                    {selectedItems.length === 0 ? "Select": selectedItems.map((item)=>{
                        return <span>{item.label}</span>
                    })}
                </span>
                {
                    showSelectPanel ? MultiSelectIcons.caretUp : MultiSelectIcons.caretDown
                }
            </div>
            {
                showSelectPanel &&
                <div className={styles.multiSelectPanel} style={{ "width": buttonWidth }}>
                    {
                        Array.isArray(options)
                            ?
                            options.map((option, optionIndex) => {
                                return (
                                    <div className={styles.singleOption}>
                                        <input
                                            style = {{"display":"none"}}
                                            id={`multiSelectOption${optionIndex}`}
                                            type="checkbox" value={option.value}
                                            onChange={(e) => { handleUserSelect({ "label": option.label, "value": option.value }) }}
                                        />
                                        <label className={styles.labelStyle} htmlFor={`multiSelectOption${optionIndex}`}>{option.label}</label>
                                    </div>
                                )
                            })
                            : "Invalid Options"
                    }
                </div>
            }
        </div>
    );
}

export default MultiSelect;
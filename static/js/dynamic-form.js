const renderFormEl = document.getElementById('render');
const formMetaEl = document.getElementById('metadata');
let metaArray = [];
let id = 1;

const createDynamicForm = () => {
    const metaData = getFormMeta();
    if(!validateFormElements(metaData)) {
        createForm(metaData);
        createMetaProperties(metaData);
        generateJSON(metaData);
    }
    
}

const getFormMeta = () => {
    const metaData = {
        id: id,
        inputType: document.getElementById('input-type'),
        maxLength: document.getElementById('max-length'),
        labelText: document.getElementById('label-text'),
        minDate: document.getElementById('min-date'),
        maxDate: document.getElementById('max-date'),
        bgColor: document.getElementById('bg-color'),
        textColor: document.getElementById('txt-color')
    };
    return metaData
}

const validateFormElements = (metaData) => {
    let formInvalid = false;

    for (var key in metaData) {
        let formEl = metaData[key];
        let nextSibling = formEl.nextElementSibling;
        let minDateTms, maxDateTms;

        if(key == 'minDate' || key == 'maxDate') {
            let minDate = formEl.value.split("-");
            let newMinDate = new Date( minDate[2], minDate[1] - 1, minDate[0]);
            minDateTms = newMinDate.getTime()

            let maxDate = formEl.value.split("-");
            let newMaxDate = new Date( maxDate[2], maxDate[1] - 1, maxDate[0]);
            maxDateTms = newMaxDate.getTime();
        }
        
        if(key != 'id') {
            formInvalid = false;
            formEl.setAttribute('class', '');
        }
        
        if(key == 'inputType') {
            if(formEl.value == '--Select--') {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Please select a type';
            }
        } else if((metaData['inputType'].value == 'Text' | metaData['inputType'].value == 'Password' | metaData['inputType'].value == 'Email') & key == 'maxLength') {
            if(isNaN(formEl.value) || formEl.value == '') {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Enter a valid Max Length';
            } else if(formEl.value < 10 || formEl.value > 200) {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Length should be between 10 and 200';
            }
        } else if(key == 'labelText') {
            if(formEl.value == '') {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Enter Label Text';
            }
        } else if(metaData['inputType'].value == 'Date' & key == 'minDate') {
            
            if(formEl.value == '') {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Please select a date';
            } else if(maxDateTms < minDateTms) {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Min Date should not be greater than Max Date';
            }
        } else if(metaData['inputType'].value == 'Date' & key == 'maxDate') {
            if(formEl.value == '') {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Please select a date';
            } else if(maxDateTms < minDateTms) {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Min Date should not be greater than Max Date';
            }
        } else if(key == 'bgColor') {
            if(formEl.value == '#000000') {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Select a color';
            }
        } else if(key == 'textColor') {
            if(formEl.value == '#000000') {
                formInvalid = true;
                formEl.setAttribute('class', 'invalid');
                nextSibling.textContent = 'Select a color';
            }
        } else {
            continue
        }
    }
    return formInvalid;
}

const createForm = (metaData) => {
    const formEl = document.createElement('form');
    formEl.setAttribute('method', 'post');
    renderFormEl.appendChild(formEl)
    formEl.appendChild(generateFormControlEl(metaData));
    formMetaEl.appendChild(createMetaProperties(metaData));
    id++;
}

const generateFormControlEl = (metaData) => {
    const fieldType = metaData.inputType.value.toLowerCase();
    const divEl = document.createElement('div');
    divEl.setAttribute('class', 'form-control');
    const labelEl = document.createElement('label');
    labelEl.innerText = metaData.labelText.value;
    divEl.appendChild(labelEl)

    const formControlEl = document.createElement('input');
    formControlEl.setAttribute('type', fieldType);

    if(fieldType == 'text' | fieldType == 'password' | fieldType == 'email' | fieldType == 'radio' | fieldType == 'checkbox') {
        formControlEl.setAttribute('maxlength', metaData.maxLength.value);
        formControlEl.setAttribute('value', '');
        formControlEl.style.backgroundColor = metaData.bgColor.value
        formControlEl.style.color = metaData.textColor.value
    } else {
        formControlEl.setAttribute('min', metaData.minDate.value);
        formControlEl.setAttribute('max', metaData.maxDate.value);
    }
    
    divEl.appendChild(formControlEl)
    return divEl;
}

const createMetaProperties = (metaData) => {
    const divEl = document.createElement('div');
    divEl.setAttribute('class', 'meta-prop')
    divEl.style.border = '1px solid #ccc';
    divEl.style.padding = '10px';
    
    for (var key in metaData) {
        let labelEl = document.createElement('label');
        if (metaData.hasOwnProperty(key)) {
            let formValue = metaData[key].value;
            if(key == 'inputType') {
                labelEl.textContent = `Type: ${formValue}`
            } else if(key == 'bgColor') {
                labelEl.textContent = `BG Color: ${formValue}`
            } else if(key == 'labelText') {
                labelEl.textContent = `Text Label: ${formValue}`
            } else if(key == 'minDate') {
                labelEl.textContent = `Min Date: ${formValue}`
            } else if(key == 'maxDate') {
                labelEl.textContent = `Max Date: ${formValue}`
            } else if(key == 'maxLength') {
                labelEl.textContent = `Max Length: ${formValue}`
            } else if(key == 'textColor') {
                labelEl.textContent = `Text Color: ${formValue}`
            } else if(key == 'id') {
                labelEl.textContent = `ID: ${metaData[key]}`
            }
            divEl.appendChild(labelEl)
        }
    }
    
    return divEl;
}

const generateJSON = (metaData) => {
    const txtArea = document.getElementById('jsonarea');
    let metaObj =  new Object();
    for(var key in metaData){
        if(key == 'minDate' || key == 'maxDate') {
            metaObj[key] = metaData[key].value
        } else {
            metaObj[key] = metaData[key].value? metaData[key].value : metaData[key]
        }
        
    }
    metaArray.push(metaObj)
    txtArea.value = JSON.stringify(metaArray)
}

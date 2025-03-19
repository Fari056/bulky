import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setRequestData } from '../../redux/actions';
import { ToastError } from '../../utilities';
import { SCREEN } from '../../constants';

let data = {
    appliancesData: [
        { id: "1", title: "Refrigerator ", count: 1 },
        { id: "2", title: "Stove/Oven", count: 1 },
        { id: "3", title: "Microwave", count: 1 },
        { id: "4", title: "Dishwasher", count: 1 },
        { id: "5", title: "Hot water heater", count: 1 },
    ],
    beds: [
        { id: "1", label: "Headboard", weight: 50 },
        { id: "2", label: "Footboard", weight: 70 },
        { id: "3", label: "California King", weight: 100 },
    ]
}

export const useRequest = (type, navigate, item, isEdit) => {
    const request_redux = useSelector(state => state.requestData)
    const dispatch = useDispatch()
    const [selectedBed, setSelectedBed] = useState(isEdit ? item?.size : null);
    const [numBoxes, setNumBoxes] = useState(isEdit ? String(item?.qty) : null);
    const [isBoxesOversized, setIsBoxesOversized] = useState(isEdit ? item?.isOverSized : false);
    const [selectedBoatSize, setSelectedBoatSize] = useState(isEdit ? item?.size : null);
    const [selectedMotorcycleType, setSelectedMotorcycleType] = useState(null);
    const [selectedTVSize, setSelectedTVSize] = useState(null);
    const [selectedConstruction, setSelectedConstruction] = useState(null);
    const [appliancesData, setAppliancesData] = useState(data.appliancesData);
    const [selectedAppliancesSizes, setSelectedAppliancesSizes] = useState(isEdit ? item?.size : null);
    const [selectedAppliances, setSelectedAppliances] = useState(isEdit ? item?.pid : null);
    const [imageAppliancesUrls, setImageAppliancesUrls] = useState(isEdit ? item?.images : []);

    const handleContinue = () => {
        try {
            switch (type) {
                case 'Bed': handleBed();
                    break;
                case 'Bike': handleBike();
                    break;
                case 'Boxes': HandleBoxes()
                    break;
                case 'Boats': HandleBoats()
                    break;
                case 'Motorcycle': HandleMotorcycle()
                    break;
                case 'TV': HandleTV()
                    break;
                case 'Construction': HandleConstruction()
                    break;
                case 'Appliances': HandleAppliances()
                    break;
                default:
                    console.log("Unknown type: " + type);
                    break;
            }
        } catch (error) {
            console.log("Error in handleContinue", error)
        }
    }

    const handleBike = () => {
        const id = Math.floor(100000 + Math.random() * 900000);
        let temp = { ...request_redux }
        let items = temp.items || [];
        if (isEdit) {
            let i = items.find(itm => itm.id === item?.id)
            let ind = items.findIndex(itm => itm.id === item?.id)
            let n = { ...i, size: selectedBed }
            items[ind] = n
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
        else {
            let DATA = { type: "Bike", id: id, weight: 40 }
            items = [...items, DATA]
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
    }

    const handleBed = () => {
        const id = Math.floor(100000 + Math.random() * 900000);
        let temp = { ...request_redux }
        let items = temp.items || [];
        let DATA = {}
        if (!selectedBed) {
            ToastError("Please select a bed");
            return
        }
        if (isEdit) {
            let i = items.find(itm => itm.id === item?.id)
            let ind = items.findIndex(itm => itm.id === item?.id)
            let n = { ...i, size: selectedBed }
            items[ind] = n
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
        else {
            let item = data.beds.find(bed => bed.label === selectedBed);
            if (item) {
                DATA = { ...item, type: "Bed", id: id, size: item.label };
                delete DATA.label;
                items = [...items, DATA];
            }
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
    }

    const HandleBoxes = () => {
        const id = Math.floor(100000 + Math.random() * 900000);
        let temp = { ...request_redux }
        let items = temp.items || [];
        let DATA = {}
        if (!numBoxes) {
            console.log("numBoxes", numBoxes)
            ToastError("Please Add number of boxes");
            return
        }
        if (isEdit) {
            let i = items.find(itm => itm.id === item?.id)
            let ind = items.findIndex(itm => itm.id === item?.id)
            let n = { ...i, qty: numBoxes, isOverSized: isBoxesOversized, weight: isBoxesOversized ? 70 : 40 }
            items[ind] = n
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
        else {
            DATA = { type: 'Boxes', id: id, qty: numBoxes, isOverSized: isBoxesOversized, weight: isBoxesOversized ? 70 : 40 }
            items = [...items, DATA];
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
    }

    const HandleBoats = () => {
        const id = Math.floor(100000 + Math.random() * 900000);
        let temp = { ...request_redux }
        let items = temp.items || [];
        let DATA = {}
        if (!selectedBoatSize) {
            ToastError("Please select a boat size");
            return
        }
        if (isEdit) {
            let i = items.find(itm => itm.id === item?.id)
            let ind = items.findIndex(itm => itm.id === item?.id)
            let n = { ...i, size: selectedBoatSize }
            items[ind] = n
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
        else {
            DATA = { type: 'Boats', id: id, size: selectedBoatSize, weight: 2500 }
            items = [...items, DATA];
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
    }

    const HandleMotorcycle = () => {
        const id = Math.floor(100000 + Math.random() * 900000);
        let temp = { ...request_redux }
        let items = temp.items || [];
        let DATA = {}
        let weight = selectedMotorcycleType == 'Traditional 2 wheel' ? 400 :
            selectedMotorcycleType == 'Tricycle' ? 500 :
                selectedMotorcycleType == 'Golf Cart' ? 400 :
                    selectedMotorcycleType == '4 wheeler' ? 700 :
                        selectedMotorcycleType == 'Side by side' ? 700 : 0
        if (!selectedMotorcycleType) {
            ToastError("Please select a motorcycle type");
            return
        }
        if (isEdit) {
            let i = items.find(itm => itm.id === item?.id)
            let ind = items.findIndex(itm => itm.id === item?.id)
            let n = { ...i, size: selectedMotorcycleType, weight: weight }
            items[ind] = n
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
        else {
            DATA = { type: 'Motorcycle', id: id, size: selectedMotorcycleType, weight: weight }
            items = [...items, DATA];
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
    }

    const HandleTV = () => {
        const id = Math.floor(100000 + Math.random() * 900000);
        let temp = { ...request_redux }
        let items = temp.items || [];
        let DATA = {}
        let weight = selectedTVSize == 'Up to 50' ? 100 : selectedTVSize == 'over 50' ? 200 : 0
        if (!selectedTVSize) {
            ToastError("Please select a TV size");
            return
        }
        if (isEdit) {
            let i = items.find(itm => itm.id === item?.id)
            let ind = items.findIndex(itm => itm.id === item?.id)
            let n = { ...i, size: selectedTVSize, weight: weight }
            items[ind] = n
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
        else {
            DATA = { type: 'TV', id: id, size: selectedTVSize, weight: weight }
            items = [...items, DATA];
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
    }

    const HandleConstruction = () => {
        const id = Math.floor(100000 + Math.random() * 900000);
        let temp = { ...request_redux }
        let items = temp.items || [];
        let DATA = {}
        if (!selectedConstruction) {
            ToastError("Please select a construction type");
            return
        }
        if (isEdit) {
            let i = items.find(itm => itm.id === item?.id)
            let ind = items.findIndex(itm => itm.id === item?.id)
            let n = { ...i, size: selectedConstruction }
            items[ind] = n
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
        else {
            DATA = { type: 'Construction', id: id, size: selectedConstruction, weight: 1000 }
            items = [...items, DATA];
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
    }

    const HandleAppliances = () => {
        let sel = selectedAppliances
        const weight = sel == 0 ? '300' : sel == 1 ? '250' : sel == 2 ? '50' : sel == 3 ? '100' : sel == 4 ? '250' : '100'
        if (!selectedAppliances) {
            ToastError("Please select an appliance");
            return
        }
        const id = Math.floor(100000 + Math.random() * 900000);
        let temp = { ...request_redux }
        let items = temp.items || [];
        let DATA = {}
        let seleted = appliancesData?.find(size => size.id == selectedAppliances + 1)
        if (isEdit) {
            let i = items.find(itm => itm.id === item?.id)
            let ind = items.findIndex(itm => itm.id === item?.id)
            let n = { ...i, weight: weight, size: selectedAppliancesSizes, images: imageAppliancesUrls }
            items[ind] = n
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
        else {
            DATA = { ...seleted, pid: seleted.id, type: 'Appliances', id: id, weight: weight, size: selectedAppliancesSizes, images: imageAppliancesUrls }
            items = [...items, DATA];
            let newData = { ...temp, items: items };
            dispatch(setRequestData(newData))
            navigate(SCREEN.SelectedItems, { item: [] })
        }
    }

    return {
        selectedBed, setSelectedBed,
        numBoxes, setNumBoxes,
        isBoxesOversized, setIsBoxesOversized,
        selectedBoatSize, setSelectedBoatSize,
        selectedMotorcycleType, setSelectedMotorcycleType,
        selectedTVSize, setSelectedTVSize,
        selectedConstruction, setSelectedConstruction,
        appliancesData, setAppliancesData,
        selectedAppliancesSizes, setSelectedAppliancesSizes,
        selectedAppliances, setSelectedAppliances,
        imageAppliancesUrls, setImageAppliancesUrls,
        handleContinue,
        data
    }
}
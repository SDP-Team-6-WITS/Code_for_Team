import Availability from '../../Models/Availability.js';

export const getAvailability = async (id) => {
    try{
        const availability = await Availability.find({user:id});
        if(!availability) throw new Error('Availability not found');
        return availability;
    }
    catch (error) {
        throw new Error(`Error fetching availability: ${error.message}`);
    }
};

export const changeAvailability = async (id, payload) => {
    try{
        const availability = await Availability.findById(id);
        if(!availability) throw new Error('Availability not found');
        Object.keys(payload).forEach((key) => {
            availability[key] = payload[key];
        });
        const updatedAvailability = await availability.save();
        return updatedAvailability;
    }
    catch (error) {
        throw new Error(`Error updating availability: ${error.message}`);
    }
};

//Create new Availability
export const createAvailability = async (payload) => {
    try {
        const newAvailability = new Availability(payload);
        const savedAvailability = await newAvailability.save();
        return savedAvailability;
    } catch (error) {
        throw new Error(`Error creating availability: ${error.message}`);
    }
};

//Delete Availability
export const deleteAvailability = async (id) => {
    try {
        const result = await Availability.findByIdAndDelete(id);
        if (!result) throw new Error('Feedback not found');
        return result;
    } catch (error) {
        throw new Error(`Error deleting feedback: ${error.message}`);
    }
};
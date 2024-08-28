// Function to round a number to 2 decimal places
export const round2 = (num) => 
    Math.round((num + Number.EPSILON) * 100) / 100;

// Function to convert a MongoDB document to an object with stringified _id
export function convertDocToObj(doc) {
    doc._id = doc._id.toString();
    return doc;
}

// Function to format a number with commas as thousands separators
export const formatNumber = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Function to format an ID by extracting a part of the string
export const formatId = (x) => {
    return `..${x.substring(20, 24)}`;
};

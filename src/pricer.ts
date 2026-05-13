export type Category = 'size' | 'creamer'; 
export type Option = 'small' | 'medium' | 'large' | 'none' | 'dairy' | 'non-dairy'; 
export type Price = number; 

export interface Pricer { 
    /** 
     * * Invoked each time the user makes a selection. 
     * * No need to validate arguments, the caller validates the arguments before this function is invoked. 
     * * @returns the _total_ price of the coffee so far given all the selections made 
     */ 
    
    (category: Category, option: Option): Price 
}

const priceMap: Record<Option, number> = {
    small: 1.0,
    medium: 1.50,
    large: 2.0,
    none: 0,
    dairy: 0.25,
    'non-dairy': 0.50,
}

    
    /** 
     * A new pricer is created for each coffee being purchased. 
     */ 
export const createPricer = (): Pricer => { 
    var size = 0;
    var creamer = 0;
    var price = 0;
    // your code goes here
    return (category: Category, option: Option): Price => {
        // your code goes here
        if(category == 'size') {
            size = priceMap[option];
        }
        if (category == 'creamer') {
            creamer = priceMap[option];
        }
        price = size + creamer;
        return price;
    }
}

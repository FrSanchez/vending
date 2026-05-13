export type Category = 'size' | 'creamer'; 
export type Option = 'small' | 'medium' | 'large' | 'none' | 'dairy' | 'non-dairy'; 
export type Price = number; 

export interface Pricer { 
    /** 
     * * Invoked each time the user makes a selection. 
     * * No need to validate arguments, the caller validates the arguments before this function is invoked. 
     * * @returns the _total_ price of the coffee so far given all the selections made 
     */ 
    
    (category: Category, option: Option): Price } 
    
    /** 
     * A new pricer is created for each coffee being purchased. 
     */ 
export const createPricer = (): Pricer => { 
    // your code goes here
    return (category: Category, option: Option): Price => {
        // your code goes here
        return 0; 
    }
}

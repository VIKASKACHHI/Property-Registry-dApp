#![allow(non_snake_case)]
#![no_std]
use soroban_sdk::{contract, contracttype, contractimpl, log, Env, Address, String, symbol_short, Symbol};

// Structure to store property details
#[contracttype]
#[derive(Clone)]
pub struct Property {
    pub property_id: u64,
    pub owner: Address,
    pub location: String,
    pub area: u64,           // area in square meters
    pub is_registered: bool,
}

// Mapping property ID to Property struct
#[contracttype]
pub enum PropertyBook {
    Property(u64)
}

// Counter for generating unique property IDs
const PROPERTY_COUNT: Symbol = symbol_short!("PROP_CNT");

#[contract]
pub struct PropertyRegistryContract;

#[contractimpl]
impl PropertyRegistryContract {
    
    // Function to register a new property
    pub fn register_property(
        env: Env,
        owner: Address,
        location: String,
        area: u64
    ) -> u64 {
        // Verify the owner is calling this function
        owner.require_auth();
        
        // Get and increment property count
        let mut property_count: u64 = env.storage().instance().get(&PROPERTY_COUNT).unwrap_or(0);
        property_count += 1;
        
        // Create new property record
        let new_property = Property {
            property_id: property_count,
            owner: owner.clone(),
            location,
            area,
            is_registered: true,
        };
        
        // Store the property
        env.storage().instance().set(
            &PropertyBook::Property(property_count),
            &new_property
        );
        
        // Update property count
        env.storage().instance().set(&PROPERTY_COUNT, &property_count);
        
        // Extend TTL for storage
        env.storage().instance().extend_ttl(5000, 5000);
        
        log!(&env, "Property registered with ID: {}", property_count);
        
        property_count
    }
    
    // Function to transfer property ownership
    pub fn transfer_property(
        env: Env,
        property_id: u64,
        current_owner: Address,
        new_owner: Address
    ) {
        // Verify the current owner is calling this function
        current_owner.require_auth();
        
        // Retrieve the property
        let mut property = Self::view_property(env.clone(), property_id);
        
        // Verify property exists and current owner matches
        if !property.is_registered {
            log!(&env, "Property not found or not registered");
            panic!("Property not found");
        }
        
        if property.owner != current_owner {
            log!(&env, "Unauthorized: You are not the owner");
            panic!("Unauthorized transfer attempt");
        }
        
        // Update ownership
        property.owner = new_owner.clone();
        
        // Store updated property
        env.storage().instance().set(
            &PropertyBook::Property(property_id),
            &property
        );
        
        // Extend TTL
        env.storage().instance().extend_ttl(5000, 5000);
        
        log!(&env, "Property {} transferred to new owner", property_id);
    }
    
    // Function to view property details
    pub fn view_property(env: Env, property_id: u64) -> Property {
        let key = PropertyBook::Property(property_id);
        
        env.storage().instance().get(&key).unwrap_or(Property {
            property_id: 0,
            owner: Address::from_string(&String::from_str(&env, "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF")),
            location: String::from_str(&env, "Not_Found"),
            area: 0,
            is_registered: false,
        })
    }
    
    // Function to get total registered properties count
    pub fn get_total_properties(env: Env) -> u64 {
        env.storage().instance().get(&PROPERTY_COUNT).unwrap_or(0)
    }
}
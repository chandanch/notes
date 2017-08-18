# Structure Data

## How the Data is organized : JSON tree
* All Firebase Realtime Database data is stored as JSON objects.
*  You can think of the database as a cloud-hosted JSON tree
*  Unlike a SQL database, there are no tables or records
* When you add data to the JSON tree, it becomes a node in the existing JSON structure with an associated key.
You can provide your own keys, such as user IDs or semantic names, or they can be provided for you using `push()`.
* Keys are 768 bytes
* Example is a chat application


# Best Practices for data structure

## Avoid Nesting
* Firebase Realtime Database allows nesting data up to 32 levels deep
*  In practice, it's best to keep your data structure as flat as possible

## Flatten data structures
* Split the data into seperate paths
* Example : Chat data split

## Create Data that scales
* Get only a subset of data
* We can denormalize the data for dynamic relationship by querying only the subset of data
* Example : flat scales
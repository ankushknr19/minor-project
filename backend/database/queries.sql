CREATE DATABASE projectone;

CREATE TABLE products
(
    product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_name VARCHAR(255) NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    product_price NUMERIC NOT NULL DEFAULT 0,
    count_in_stock NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP
    WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

    insert into products
        (product_name, product_image, product_description, product_price, count_in_stock)
    VALUES
        ('Airpods Wireless Bluetooth Headphones', '/images/airpods.jpg', 'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working', '50000', '10');

    --users table
    CREATE TABLE users
    (
        user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255)NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        is_vendor BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP
        WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
    UNIQUE
        (email)
);

        --vendor table
        CREATE TABLE vendors
        (
            vendor_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id uuid,
            name VARCHAR(255)NOT NULL,
            created_at TIMESTAMP
            WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
	        FOREIGN KEY
            (user_id) REFERENCES users
            (user_id)

);

            --customer table
            CREATE TABLE customers
            (
                customer_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                user_id uuid,
                name VARCHAR(255)NOT NULL,
                phone_number NUMERIC,
                created_at TIMESTAMP
                WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
	    FOREIGN KEY
                (user_id) REFERENCES users
                (user_id)

);

                CREATE TABLE customer_addresses
                (
                    address_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                    customer_id uuid,
                    name VARCHAR(255) NOT NULL,
                    phone_number NUMERIC NOT NULL,
                    city VARCHAR(255) NOT NULL,
                    area VARCHAR(255) NOT NULL,
                    address VARCHAR(255) NOT NULL,
                    is_default BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMP
                    WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
	    FOREIGN KEY
                    (customer_id) REFERENCES customers
                    (customer_id)

);
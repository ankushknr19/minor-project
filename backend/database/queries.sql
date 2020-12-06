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
    -- FOREIGN KEY (product_id) REFERENCES reviews(review_id)

    insert into products
        (product_name, product_image, product_description, product_price, count_in_stock)
    VALUES
        ('Airpods Wireless Bluetooth Headphones', '/images/airpods.jpg', 'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working', '50000', '10');

    --users table
    CREATE TABLE users
    (
        user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        first_name VARCHAR(255)NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        is_vendor BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP
        WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
    UNIQUE
        (email)
);

        insert into users
            (first_name, last_name, email, password, is_admin)
        values
            ('Ankush', 'Kunwar', 'ank.knr@gmail.com', 'test123', 'true' );
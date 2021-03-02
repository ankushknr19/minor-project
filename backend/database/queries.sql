CREATE DATABASE projectone;

--users table
CREATE TABLE users
(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255)NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    is_vendor BOOLEAN DEFAULT FALSE,
    is_customer BOOLEAN DEFAULT FALSE,
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
        vendor_name VARCHAR(255)NOT NULL,
        vendor_logo VARCHAR,
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
            customer_name VARCHAR(255)NOT NULL,
            phone_number NUMERIC,
            created_at TIMESTAMP
            WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
	    FOREIGN KEY
            (user_id) REFERENCES users
            (user_id)

);

            --product table

            CREATE TABLE products
            (
                product_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                product_name VARCHAR(255) NOT NULL,
                product_image VARCHAR(255) NOT NULL,
                product_description TEXT NOT NULL,
                product_price NUMERIC NOT NULL DEFAULT 0,
                count_in_stock NUMERIC NOT NULL DEFAULT 0,
                category VARCHAR,
                vendor_id uuid,
                is_active BOOLEAN DEFAULT TRUE
                created_at TIMESTAMP
                WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY
                (vendor_id) REFERENCES vendors
                (vendor_id)

);

                -- customer address table

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

                    -- cart table
                    CREATE TABLE carts
                    (
                        cart_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                        customer_id uuid,
                        product_id uuid,
                        qty INT DEFAULT 1,
                        created_at TIMESTAMP
                        WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
                        updated_at TIMESTAMP
                        WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
                        FOREIGN KEY
                        (customer_id) REFERENCES customers
                        (customer_id),
                        FOREIGN KEY
                        (product_id) REFERENCES products
                        (product_id)
                    );

                        -- order table
                        CREATE TABLE orders
                        (
                            order_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                            customer_id uuid,
                            payment_id uuid,
                            total_price NUMERIC,
                            shipping_address varchar,
                            is_fulfilled BOOLEAN DEFAULT FALSE,
                            created_at TIMESTAMP
                            WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
	                    FOREIGN KEY
                            (customer_id) REFERENCES customers
                            (customer_id)

);
                            -- order details table
                            CREATE TABLE order_details
                            (
                                order_details_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                order_id uuid,
                                product_id uuid,
                                customer_id uuid,
                                vendor_id uuid,
                                is_fulfilled BOOLEAN DEFAULT FALSE,
                                qty INT ,
                                price NUMERIC,
                                created_at TIMESTAMP
                                WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
	                    FOREIGN KEY
                                (order_id) REFERENCES orders
                                (order_id),
	                    FOREIGN KEY
                                (product_id) REFERENCES products
                                (product_id),
	                    FOREIGN KEY
                                (customer_id) REFERENCES customers
                                (customer_id),
	                    FOREIGN KEY
                                (vendor_id) REFERENCES vendors
                                (vendor_id)

);

--                                 -- payment done by customers table
--                                 CREATE TABLE payments
--                                 (
--                                     payment_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--                                     customer_id uuid,
--                                     amount NUMERIC,
--                                     created_at TIMESTAMP
--                                     WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
--                                 FOREIGN KEY
--                                     (customer_id) REFERENCES customers
--                                     (customer_id)
-- );

--  -- product category table
--                         CREATE TABLE product_categories
--                         (
--                             product_category_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--                             product_id uuid,
--                             name VARCHAR(255),
--                             is_active BOOLEAN DEFAULT TRUE,
--                             created_at TIMESTAMP
--                             WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
-- 	                    FOREIGN KEY
--                             (product_id) REFERENCES products
--                             (product_id)

-- );
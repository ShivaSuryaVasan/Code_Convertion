CREATE PROCEDURE record_example(given_id IN TEXT) AS $$
DECLARE
rec record;
BEGIN
SELECT * INTO rec FROM products WHERE id = given_id;
RAISE NOTICE 'price: %', rec.price;
END
$$ LANGUAGE plpgsql;
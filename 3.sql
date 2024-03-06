--statement-1

CREATE PROCEDURE record_example(given_id IN TEXT) AS $$
DECLARE
rec record;
BEGIN
SELECT * INTO rec FROM products WHERE id = given_id;
RAISE NOTICE 'price: %', rec.price;
END
$$ LANGUAGE plpgsql;


--statement-2:

CREATE PROCEDURE fibonacci(n IN INT, result OUT INT) AS $$
DECLARE
phi DOUBLE PRECISION;
psi DOUBLE PRECISION;
temp DOUBLE PRECISION;
BEGIN
phi := (1 + SQRT(5)) / 2;
psi := (1 - SQRT(5)) / 2;
temp := (POWER(phi, n) - POWER(psi, n)) / SQRT(5);
result := ROUND(temp)::integer;
END
$$ LANGUAGE plpgsql;


--statement-3

CREATE or replace PROCEDURE employee_temp (cond_param IN int, tmp_table_name INOUT varchar(256)) as $$
DECLARE row record;
BEGIN
  EXECUTE 'drop table if exists ' || tmp_table_name;
  EXECUTE 'create temp table ' || tmp_table_name || ' as select * from employee where salary >= ' || cond_param;
END;

$$ LANGUAGE plpgsql;

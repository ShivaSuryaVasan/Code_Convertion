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
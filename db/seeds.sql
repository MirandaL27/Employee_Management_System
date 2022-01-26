INSERT INTO department (name)
VALUES 
('HR'),
('Financial'),
('Specialty Solutions');

INSERT INTO role (title, salary, department_id)
VALUES
('software engineer I', 80000.00,3),
('software engineer II', 100000.00, 3),
('Accountant', 62000.00, 2),
('HR manager', 93000.00, 1),
('HR Generalist', 58000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Doug','Peters', 2 ,NULL),
('Holly', 'Winters', 1, 1),
('Manny', 'Nielson', 3, NULL),
('Mary', 'Washington', 3 , 3),
('Bary', 'Jordan', 4, NULL),
('George', 'Harrison', 5, 5),
('Francine', 'Mendelson', 5, 5),
('Harry', 'Green', 1, 1);

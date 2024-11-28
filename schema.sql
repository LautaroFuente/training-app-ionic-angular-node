-- Tabla para los usuarios
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- ID del usuario, clave primaria
    name VARCHAR(100) NOT NULL,                  -- Nombre del usuario
    email VARCHAR(100) NOT NULL UNIQUE,          -- Correo electrónico único
    password VARCHAR(255) NOT NULL,              -- Contraseña (debería almacenarse en forma de hash)
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro
    gender CHAR(1)                               -- Género, opcional (M/F/ otro)
);

-- Tabla para los grupos musculares
CREATE TABLE Muscle_Group (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- ID del grupo muscular
    name VARCHAR(100) NOT NULL,                  -- Nombre del grupo muscular (Ej: Pecho, Espalda)
    description TEXT                             -- Descripción opcional del grupo muscular
);

-- Tabla para los ejercicios
CREATE TABLE Exercise (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- ID del ejercicio
    name VARCHAR(100) NOT NULL,                  -- Nombre del ejercicio
    description TEXT,                            -- Descripción del ejercicio
    muscle_group_id INT,                         -- ID del grupo muscular (relacionado con Muscle_Groups)
    video_url VARCHAR(255),                      -- URL de un video (opcional)
    image_url VARCHAR(255),                      -- URL de una imagen (opcional)
    FOREIGN KEY (muscle_group_id) REFERENCES Muscle_Groups(id)  -- Relación con Muscle_Groups
);

-- Tabla para las rutinas
CREATE TABLE Routine (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- ID de la rutina
    name VARCHAR(100) NOT NULL,                  -- Nombre de la rutina
    description TEXT,                            -- Descripción de la rutina
    user_id INT,                                 -- ID del usuario que crea la rutina
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación
    FOREIGN KEY (user_id) REFERENCES Users(id)  -- Relación con Users
);

-- Tabla intermedia para los ejercicios en las rutinas
CREATE TABLE Routine_Exercise (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- ID de la relación
    routine_id INT,                              -- ID de la rutina
    exercise_id INT,                             -- ID del ejercicio
    repetitions INT,                             -- Repeticiones recomendadas
    sets INT,                                    -- Series recomendadas
    weight DECIMAL(5,2),                         -- Peso recomendado (opcional)
    FOREIGN KEY (routine_id) REFERENCES Routines(id),  -- Relación con Routines
    FOREIGN KEY (exercise_id) REFERENCES Exercises(id) -- Relación con Exercises
);

-- Tabla para el calendario semanal
CREATE TABLE Weekly_Calendar (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- ID de la asignación
    user_id INT,                                 -- ID del usuario
    day VARCHAR(10),                             -- Día de la semana (Ej: Lunes, Martes, etc.)
    routine_id INT,                              -- ID de la rutina asignada
    FOREIGN KEY (user_id) REFERENCES Users(id),  -- Relación con Users
    FOREIGN KEY (routine_id) REFERENCES Routines(id) -- Relación con Routines
);

-- Tabla para el progreso del usuario
CREATE TABLE User_Progress (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- ID del progreso
    user_id INT,                                 -- ID del usuario
    exercise_id INT,                             -- ID del ejercicio
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Fecha del progreso
    repetitions_completed INT,                   -- Repeticiones realizadas
    weight_used DECIMAL(5,2),                    -- Peso utilizado (opcional)
    notes TEXT,                                  -- Notas adicionales (opcional)
    FOREIGN KEY (user_id) REFERENCES Users(id),  -- Relación con Users
    FOREIGN KEY (exercise_id) REFERENCES Exercises(id) -- Relación con Exercises
);

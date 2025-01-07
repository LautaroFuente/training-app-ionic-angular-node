-- Tabla para los usuarios
CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- ID del usuario, clave primaria
    name VARCHAR(100) NOT NULL,                   -- Nombre del usuario
    email VARCHAR(100) NOT NULL UNIQUE,           -- Correo electrónico único
    password VARCHAR(255) NOT NULL,               -- Contraseña (debería almacenarse en forma de hash)
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Fecha de registro
    gender CHAR(1)                                -- Género, opcional (M/F/ otro)
);

-- Tabla para los grupos musculares
CREATE TABLE MuscleGroup (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- ID del grupo muscular
    name VARCHAR(100) NOT NULL,                   -- Nombre del grupo muscular (Ej: Pecho, Espalda)
    description TEXT                              -- Descripción opcional del grupo muscular
);

-- Tabla para los ejercicios
CREATE TABLE Exercise (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- ID del ejercicio
    name VARCHAR(100) NOT NULL,                   -- Nombre del ejercicio
    description TEXT,                             -- Descripción del ejercicio
    muscleGroupId INT,                            -- ID del grupo muscular (relacionado con MuscleGroup)
    videoUrl VARCHAR(255),                        -- URL de un video (opcional)
    imageUrl VARCHAR(255),                        -- URL de una imagen (opcional)
    FOREIGN KEY (muscleGroupId) REFERENCES MuscleGroup(id)  -- Relación con MuscleGroup
);

-- Tabla para las rutinas
CREATE TABLE Routine (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- ID de la rutina
    name VARCHAR(100) NOT NULL,                   -- Nombre de la rutina
    description TEXT,                             -- Descripción de la rutina
    userId INT,                                   -- ID del usuario que crea la rutina
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    FOREIGN KEY (userId) REFERENCES User(id)      -- Relación con User
);

-- Tabla intermedia para los ejercicios en las rutinas
CREATE TABLE RoutineExercise (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- ID de la relación
    routineId INT,                                -- ID de la rutina
    exerciseId INT,                               -- ID del ejercicio
    repetitions INT,                              -- Repeticiones recomendadas
    sets INT,                                     -- Series recomendadas
    weight DECIMAL(5,2),                          -- Peso recomendado (opcional)
    FOREIGN KEY (routineId) REFERENCES Routine(id),  -- Relación con Routine
    FOREIGN KEY (exerciseId) REFERENCES Exercise(id) -- Relación con Exercise
);

-- Tabla para el calendario semanal
CREATE TABLE WeeklyCalendar (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- ID de la asignación
    userId INT,                                   -- ID del usuario
    startDate DATE,                               -- Fecha de inicio de la semana
    endDate DATE,                                 -- Fecha de fin de la semana
    FOREIGN KEY (userId) REFERENCES User(id)      -- Relación con User
);

-- Tabla para los días de la semana
CREATE TABLE Day (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- ID del día
    name VARCHAR(10),                             -- Nombre del día de la semana
    status ENUM('assigned', 'empty') DEFAULT 'empty',  -- Estado de cada día (si está asignado o vacío)
    routineId INT,                                -- ID de la rutina asignada al día
    weeklyCalendarId INT,                         -- ID del calendario semanal al que pertenece el día
    completed BOOLEAN DEFAULT FALSE,              -- Si el día fue completado o no (progreso)
    FOREIGN KEY (routineId) REFERENCES Routine(id), -- Relación con Routine
    FOREIGN KEY (weeklyCalendarId) REFERENCES WeeklyCalendar(id)  -- Relación con WeeklyCalendar
);

-- Tabla para el progreso del usuario
CREATE TABLE UserProgress (
    id INT AUTO_INCREMENT PRIMARY KEY,           -- ID del progreso
    userId INT,                                  -- ID del usuario
    dayId INT,                                   -- ID del día (de la tabla Day)
    routineId INT,                               -- ID de la rutina asignada
    exerciseId INT,                              -- ID del ejercicio asignado
    completed BOOLEAN DEFAULT FALSE,             -- Si el ejercicio fue completado o no
    completionDate TIMESTAMP,                    -- Fecha en la que el ejercicio fue completado
    FOREIGN KEY (userId) REFERENCES User(id),    -- Relación con User
    FOREIGN KEY (dayId) REFERENCES Day(id),      -- Relación con Day
    FOREIGN KEY (routineId) REFERENCES Routine(id), -- Relación con Routine
    FOREIGN KEY (exerciseId) REFERENCES Exercise(id) -- Relación con Exercise
);

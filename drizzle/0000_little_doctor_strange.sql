CREATE TABLE "dictionary" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "dictionary_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"source_word" varchar(255) NOT NULL,
	"translated_word" varchar(255) NOT NULL,
	"source_language" varchar(50) DEFAULT 'Danish' NOT NULL,
	"target_language" varchar(50) DEFAULT 'English' NOT NULL
);

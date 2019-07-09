## file access

# FILE struct [file pointer] (Stream)
    1. buffer
    2. current char position
    3. mode read/write
    4. error/eof

## stream can be redirected
> a binary stream && a text stream.

1. FILE * fopen(path, mode)
2. FILE * freopen (const char *filename, const char *opentype, FILE *stream)
> creates a new stream and establishes a connection between the stream and a file.
2. int fclose(FILE *fp);
    1. flush any buffered output
3. int exit(int )
## file IO error
1. ferror(FILE*) 
    1. non-zero if Error
    2. zero if Ok
2. feof(FILE*)
    1. none-zero if end of file
    2. zero if not end

## character by character
***
return EOF
    1. error
    2. end of file
***
1. int getc(FILE *fp);
2. int putc(int c, FILE *FP);
> output to the ***stream*** is appended to the end of the ***file***. 

## format read/write
1. int fscanf(FILE *fp, char *format, ...);
2. int fprintf(FILE *fp, char *format, ...)

## line read/write
1. char *fgets(char* buffer, int maxChars, FILE* fp)
    1. return NULL for error/eof
    2. read AT MOST maxChars - 1 characters and padding with '\0' and return
    3. including the new-line characters  and return

2. int fputs(char* line, FILE *fp)

## Direct input/output: [Block Input/Output]
1. size_t fread(void *ptr, size_t size, size_t count, FILE *fp)
> The total number of elements successfully read is returned. 
2. size_t fwrite ( const void * ptr, size_t size, size_t count, FILE * stream );
```
arbitrary blocks of memory—not just character or string objects
    floats
    doubles
    struct student {}
    ...
```
## unreading
1.  int ungetc (int c, FILE *stream)
# file redirection
```
fclose (stdout);
stdout = fopen ("standard-output-file", "w");
```
> Note however, that in other systems stdin, stdout, and stderr are macros that you cannot assign to in the normal way. But you can use freopen to get the effect of closing one and reopening it.


> Macro: int FOPEN_MAX
> Macro: int TMP_MAX

```
  // obtain file size:
  fseek (pFile , 0 , SEEK_END);
  lSize = ftell (pFile);
  rewind (pFile);
```

## others
1. int remove(char* filename)
2. int rename(char* oldName, char* newName)
3. FILE *tmpfile(void)
4. char* tmpnam(char s[L_tmpnam])
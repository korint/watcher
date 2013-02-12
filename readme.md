# watcher — Utility for watching file trees in node.js

## Install

<pre>
  npm install -g git://github.com/Wikimapia/watcher.git
</pre>

## Purpose

Module is aimed to make easier the simple automation of watching of directory trees.

## Usage

<pre>
  $ watcher -i 250 -d . -a 'echo $file was $action';
</pre>

Args:
<pre>
    --directory, -d  Define the root directory to watch, if this is not defined
                   the program will use the current working directory.
  --created, -c    Command to handle created files                              
  --modified, -m   Command to handle modified files                             
  --removed, -r    Command to handle deleted files                              
  --all, -a        Command to handle all file changes                           
  --interval, -i   Watcher interval                               [default: 150]
  --help, -h       Show this message
</pre>

## Command handlers

Handlers are your custom shell commands called for each modified file. Passed as strings, 
following placeholders will be replaced with actual values

<pre>
$file     -> full name
$action   -> [created|modified|removed]
$relative -> relative path(to process)
$fileName -> base name of the file
</pre>

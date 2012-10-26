Illustrate fork logic.
parent.js forked child.js and child.js keeps the process running.

parent.js can send a message to child.

child can exit its own process using process.disconnect();


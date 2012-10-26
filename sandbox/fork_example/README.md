Illustrate fork logic.
parent.js forked child.js and child.js keeps the process running.

parent.js can send a message to child.

child can exit its own process using process.disconnect();

To run it, type node parent

There will be three outcome:

1. the child.js should send something back to the parent, and then exit gracefully.

2. the child_error.js should crash since there is compilation, but the parent should receive the exit event. In addition, the excpetion is shown since {silent:false} is passed in.

3. the child_exception.js should crash since it throws exception, but the parent should receive the exit event


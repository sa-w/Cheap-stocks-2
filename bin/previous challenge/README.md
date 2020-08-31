<h1><b>WELCOME</b></h1>
<p> A command line application for checking whether currency is supported, given input based on 1SO 4217 Code</p>
<ul>
<li><a href="#design">Design</a></li>
<li><a href="#development">Development</a></li>
<li><a href="#installation">Installation</a></li>
<li><a href="#examples">Examples</a></li>
</ul>

<h3 id="design"><b>Design</b></h3>
<hr>

<p>


<b>Query loop<b><br>
user &rarr; command line terminal &rarr; NodeJs backend 

<b>Feedback loop</b><br>
user &larr; command line terminal &larr; NodeJs backend 


</p>


<h3 id="development"><b>Development</b></h3>
<hr>
<p>
NodeJs was used for the backend.
Modules used include the following
<ol>
<li> Nodemon - Automatically restarts the NodeJs serever</li>
<li> Commander - Module used for writing the command line application</li>
<li>Csvtojson - Module used for parsing csv into json array </li>
<li>chalk - Used in adding text colour within the command line </li>
<li>Boxen - Used for defining borders, alignment and padding within the command line </li>
</ol>
</p>
<h3 id="installation"><b>Installation (This app has been developed and tested on a machine that runs Microsoft Windows OS. Performance may differ in other OS) </b></h3>

<hr>

<p>To install please follow below steps

<ol>
<li>Clone this project into your machine</li>
<li>From your command line terminal navigate to the folder holding this project i.e cheapstocksinc folder</li>
<li>Run "npm install" command from your comand line terminal after following step 2</li>
<li>Run "npm install -g ." command from your comand line terminal after following step 3.</li>
<li>Step 4 installs this application globally in your machine</li>
<li>Open another command line terminal and type the command "cheap-stocks" to get started</li>
<li>That's it. </li>
</ol>


</p>

<h3 id="examples"><b>Examples</b></h3>

<hr>

<p>Run below commands in your command line terminal <ol>
<li>cheap-stocks -a      (Loads about section)</li>
<li>cheap-stocks -v DZD  (Checks whether the provided value i.e. DZD is supported in the application)</li>
<li>cheap-stocks -h      (Loads help section)</li>
</ol> </p>

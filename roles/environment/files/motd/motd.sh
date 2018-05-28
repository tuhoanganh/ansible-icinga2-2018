 #!/bin/bash
export TERM=xterm
export UPDATES=$(cat /tmp/update.log 2>/dev/null |wc -l)
checkupdate(){
if [[ $UPDATES == "0" ]]; then
 echo -e " \033[0mUpdates       = \033[1;32m`echo $UPDATES` \033[0mupdates available"
else
 echo -e " \033[0mUpdates       = \033[1;32m`echo $UPDATES` \033[0mupdates available (Check updates list in /tmp/update.log)"
fi
}

echo -e "=====================================================================
=                             WARNING                               =
=              All connections are monitored and recorded           =
=====================================================================
=========================: System Data :=============================
 \033[0mDate Time     = \033[1;32m`date`
 \033[0mHostname      = \033[1;32m`hostname`
 \033[0mAddress       = \033[1;32m$(echo $(/sbin/ifconfig | grep -w inet | awk '{print $2}' | grep -v 127.0.0.1))
 \033[0mKernel        = \033[1;32m`uname -r`
 \033[0mUptime        = \033[1;32m`uptime -s`
                 \033[1;32m`uptime -p`
 \033[0mLoad Average  = \033[1;32m`uptime | sed 's/^.*: //'`
 \033[0mCPU           = \033[1;32m`cat /proc/cpuinfo | grep -m 1 "model name" | awk -F ": " '{print $2}'`
 \033[0mCores         = \033[1;32m`cat /proc/cpuinfo | grep  "model name" |wc -l` \033[0mCores/vCPUs
 \033[0mMemory        = \033[0mTotal: \033[1;32m`free -m  |awk 'FNR==2 {print $2}'`MB\033[0m, Available: \033[1;32m`free -m  |awk 'FNR==2 {print $7}'`MB\033[0m, Used: \033[1;32m`free -m  |awk 'FNR==2 {print $3}'`MB
 \033[0mHDD           = \033[0mTotal: \033[1;32m`df -h |awk 'FNR==2 {print $2}'`\033[0m, Available: \033[1;32m`df -h |awk 'FNR==2 {print $4}'`\033[0m, Used:\033[1;32m`df -h |awk 'FNR==2 {print $3}'`\033[0m (Used \033[1;32m`df -h |awk 'FNR==2 {print $5}'`\033[0m)
`checkupdate`
===================: Connecting SSH Session :========================
 \033[0mSSH Logins    = \033[1;32mThere are currently `last | grep -w 'still logged in '|wc -l` users/sessions logged in
 \033[0mUsers         = \033[1;32m`last | grep -w 'still logged in' | awk '{print $1}' | tr '\n' ' ' && echo ''`\033[0m
==========================: User Data :==============================
 \033[0mUsername      = \033[1;32m`whoami`
 \033[0mIP Address    = \033[1;32m`echo $SSH_CLIENT | awk '{ print $1}'`
 \033[0mProcesses     = \033[1;32m`ps aux | grep $USER | wc -l` of `ulimit -u` MAX\033[0m
===================: Maintenance Information :=======================
 - `cat /etc/motd-maint`\033[0m
====================================================================="
tput sgr0

using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MokebManager
{
    public class Program
    {
        const string ENVIRONMENT_PATH = @"..\MokebManagerNg\angular\src\environments\environment.ts";

        public static async Task Main(string[] args)
        {
            string commandRunServer = "cd ../MokebManagerNg/aspnet-core/src/MokebManagerNg.HttpApi.Host && dotnet run";
            string commandRunAngular = "cd ../MokebManagerNg/angular && npm start";

            SetLocalIp();
            System.Console.WriteLine("Local Ip Is Set.");		
	    System.Console.ReadKey();
	
            //var programHost = new Program();
            //System.Console.WriteLine("Run host...");
            //programHost.RunCommandLineAsync(commandRunServer);

            //System.Console.WriteLine("Run Angular...");
            //var programAngular = new Program();
            //programAngular.RunCommandLineAsync(commandRunAngular);


            //System.Console.WriteLine("Server is run...");
            //Task.Delay(TimeSpan.FromMinutes(10)).Wait();

        }




        /// <summary>
        /// Runs a command line command asynchronously.
        /// </summary>
        public async Task RunCommandLineAsync(string command)
        {

            try
            {
                ProcessStartInfo startInfo = new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = $"/C {command}",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = false // CreateNoWindow set to true to keep the terminal window hidden
                };

                using (Process process = new Process { StartInfo = startInfo })
                {
                    process.OutputDataReceived += (sender, e) =>
                    {
                        if (!string.IsNullOrEmpty(e.Data))
                        {
                            Console.WriteLine(e.Data);
                        }
                    };
                    process.ErrorDataReceived += (sender, e) =>
                    {
                        if (!string.IsNullOrEmpty(e.Data))
                        {
                            Console.WriteLine($"ERROR: {e.Data}");
                        }
                    };

                    process.Start();
                    process.BeginOutputReadLine();
                    process.BeginErrorReadLine();

                    await process.WaitForExitAsync();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"An error occurred: {e.Message}");
            }
        }



        /// <summary>
        /// Updates the IP address in the environment file.
        /// </summary>
        public static void SetLocalIp()
        {
            try
            {
                string fileContent = File.ReadAllText(ENVIRONMENT_PATH);
                string localIp = GetLocalIPAddress();

                fileContent = UpdateIssuerUrl(fileContent, localIp);
                fileContent = UpdateOtherUrl(fileContent, localIp);

                File.WriteAllText(ENVIRONMENT_PATH, fileContent);

                Console.WriteLine("Local IP has been set successfully.");
            }
            catch (Exception e)
            {
                Console.WriteLine($"An error occurred while setting the local IP: {e.Message}");
            }
        }

        /// <summary>
        /// Retrieves the local IP address of the machine.
        /// </summary>
        /// <returns>The local IPv4 address.</returns>
        public static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("No network adapters with an IPv4 address in the system!");
        }

        /// <summary>
        /// Updates the issuer URL in the file content with the local IP address.
        /// </summary>
        /// <param name="fileContent">The content of the environment file.</param>
        /// <param name="localIp">The local IP address to use.</param>
        /// <returns>The updated file content.</returns>
        private static string UpdateIssuerUrl(string fileContent, string localIp)
        {
            string pattern = @"issuer:\s*'https?://[^']*'";
            string replacement = $"issuer: 'https://{localIp}:44355'";
            return Regex.Replace(fileContent, pattern, replacement);
        }

        /// <summary>
        /// Updates other URLs in the file content with the local IP address.
        /// </summary>
        /// <param name="fileContent">The content of the environment file.</param>
        /// <param name="localIp">The local IP address to use.</param>
        /// <returns>The updated file content.</returns>
        private static string UpdateOtherUrl(string fileContent, string localIp)
        {
            string pattern = @"url:\s*'https?://[^']*'";
            string replacement = $"url: 'https://{localIp}:44355'";
            return Regex.Replace(fileContent, pattern, replacement);
        }
    }
}
